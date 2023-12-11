import redis

def get_redis_connection():
    # Initialize and return a Redis connection
    # Adjust parameters according to your Redis setup
    return redis.Redis(host='localhost', port=6379, db=0)

def get_stored_refresh_token(user_identifier: str) -> str:
    redis_conn = get_redis_connection()
    return redis_conn.get(user_identifier)

def update_stored_refresh_token(user_identifier: str, new_refresh_token: str):
    redis_conn = get_redis_connection()
    redis_conn.set(user_identifier, new_refresh_token)