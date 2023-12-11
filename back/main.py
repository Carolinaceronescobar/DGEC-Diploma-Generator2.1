import uvicorn
from fastapi import FastAPI, HTTPException, Request, Depends, Security
from fastapi.middleware.cors import CORSMiddleware
from fastapi_azure_auth import MultiTenantAzureAuthorizationCodeBearer
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl
from datetime import datetime, timedelta
from jose import jwt, JWTError
from dotenv import load_dotenv
import os
import httpx
from redis_utils import get_stored_refresh_token, update_stored_refresh_token

# Load environment variables
load_dotenv()

# Function to load RSA keys from the .RSA folder
def load_rsa_keys():
    base_path = os.path.dirname(__file__)  # Get the directory of main.py
    rsa_folder = os.path.join(base_path, '.RSA')  # Path to the .RSA folder

    # Paths to RSA key files
    private_key_path = os.path.join(rsa_folder, 'private_key.pem')
    public_key_path = os.path.join(rsa_folder, 'public_key.pem')

    with open(private_key_path, 'r') as file:
        private_key = file.read()

    with open(public_key_path, 'r') as file:
        public_key = file.read()

    return private_key, public_key

# Load RSA keys before instantiating settings
private_key, public_key = load_rsa_keys()
    
# Define settings
class Settings(BaseSettings):
    BACKEND_CORS_ORIGINS: list[str | AnyHttpUrl] = ['http://localhost:5173']
    OPENAPI_CLIENT_ID: str = os.getenv("OPENAPI_CLIENT_ID")
    APP_CLIENT_ID: str = os.getenv("APP_CLIENT_ID")
    
    TENANT_ID: str = os.getenv("TENANT_ID")
    REDIRECT_URI: str = os.getenv("REDIRECT_URI")
    SECRET_KEY: str = os.getenv("SECRET_KEY")
    SCOPE: str 

    PRIVATE_KEY: str = private_key
    PUBLIC_KEY: str = public_key

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 16
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    class Config:
        env_file = '.env'
        env_file_encoding = 'utf-8'

# Instantiate settings with RSA keys
settings = Settings()

# Initialize FastAPI app
app = FastAPI(
    swagger_ui_oauth2_redirect_url='/oauth2-redirect',
    swagger_ui_init_oauth={
        'usePkceWithAuthorizationCodeGrant': True,
        'clientId': settings.OPENAPI_CLIENT_ID,
    },
)

# Add CORS middleware
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],    
    )

# Azure scheme
azure_scheme = MultiTenantAzureAuthorizationCodeBearer(
    app_client_id=settings.APP_CLIENT_ID,
    scopes={
        f'api://{settings.APP_CLIENT_ID}/user_impersonation': 'user_impersonation',
    },
    validate_iss=False  # Set to True in production
)

# Token utilities
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.PRIVATE_KEY, algorithm="RS256")
    return encoded_jwt

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.PRIVATE_KEY, algorithm="RS256")
    return encoded_jwt

def verify_token(token: str, credentials_exception):
    try:
        payload = jwt.decode(token, settings.PUBLIC_KEY, algorithms=["RS256"])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        return username
    except JWTError:
        raise credentials_exception

# Token exchange endpoint
@app.post("/token")
async def exchange_code(request: Request):
    body = await request.json()
    code = body.get("code")
    if not code:
        raise HTTPException(status_code=400, detail="Authorization code is missing")

    token_url = f"https://login.microsoftonline.com/{settings.TENANT_ID}/oauth2/v2.0/token"
    data = {
        "client_id": settings.APP_CLIENT_ID,
        "scope": "openid email profile",
        "code": code,
        "redirect_uri": os.getenv("REDIRECT_URI"),
        "grant_type": "authorization_code",
        "client_secret": 'cys8Q~GIQDjo9KWjptPinzhLw0g7V5EOsO.mSa47',
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data=data)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)

        response_data = response.json()
        username = response_data.get("username")  # ToDo

        access_token = create_access_token(data={"sub": username})
        refresh_token = create_refresh_token(data={"sub": username})

        return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

@app.post("/refresh-token")
async def refresh_access_token(user_identifier: str):  # or use a secure dependency to get the user
    refresh_token = get_stored_refresh_token(user_identifier)
    if not refresh_token:
        raise HTTPException(status_code=401, detail="Refresh token not found")

    token_url = "https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token"
    data = {
        "client_id": settings.CLIENT_ID,
        "refresh_token": refresh_token,
        "grant_type": "refresh_token",
        "client_secret": 'cys8Q~GIQDjo9KWjptPinzhLw0g7V5EOsO.mSa47',
        "scope": settings.SCOPE,  # You may need to include the scope
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data=data)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to refresh token")

        response_data = response.json()
        access_token = response_data.get("access_token")
        new_refresh_token = response_data.get("refresh_token", refresh_token)

        # Store the new refresh token in Redis
        update_stored_refresh_token(user_identifier, new_refresh_token)

        return {"access_token": access_token, "token_type": "bearer"}

@app.get("/auth/config")
async def get_auth_config():
    return {
        "tenant_id": settings.TENANT_ID,
        "client_id": settings.APP_CLIENT_ID,
        "redirect_uri": settings.REDIRECT_URI,
        "scope": settings.SCOPE
    }

# Root endpoint
@app.get("/", dependencies=[Security(azure_scheme)])
async def root():
    return {"message": "Hello World"}



# Main entry point
if __name__ == '__main__':
    uvicorn.run('main:app', host='localhost', port=8000, reload=True)
