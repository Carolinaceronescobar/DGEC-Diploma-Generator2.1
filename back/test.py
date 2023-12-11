import uvicorn
from fastapi import FastAPI, Security
from fastapi.middleware.cors import CORSMiddleware
from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings, SettingsConfigDict
from fastapi_azure_auth import MultiTenantAzureAuthorizationCodeBearer


class Settings(BaseSettings):
    BACKEND_CORS_ORIGINS: list[str | AnyHttpUrl] = ['http://localhost:8000']
    OPENAPI_CLIENT_ID: str = ""
    APP_CLIENT_ID: str = ""

    model_config = SettingsConfigDict(
        env_file='.env',
        env_file_encoding='utf-8',
        case_sensitive=True
    )

settings = Settings()

app = FastAPI(
    swagger_ui_oauth2_redirect_url='/oauth2-redirect',
    swagger_ui_init_oauth={
        'usePkceWithAuthorizationCodeGrant': True,
        'clientId': settings.OPENAPI_CLIENT_ID,
    },
)

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )


azure_scheme = MultiTenantAzureAuthorizationCodeBearer(
    app_client_id=settings.APP_CLIENT_ID,
    scopes={
        f'api://{settings.APP_CLIENT_ID}/user_impersonation': 'user_impersonation',
    },
    validate_iss=False
)


@app.on_event('startup')
async def load_config() -> None:
    """
    Load OpenID config on startup.
    """
    await azure_scheme.openid_config.load_config()


@app.get("/", dependencies=[Security(azure_scheme)])
async def root():
    return {"message": "Hello World"}


if __name__ == '__main__':
    uvicorn.run('main:app', host='localhost', port=8000, reload=True)