from pydantic_settings import BaseSettings
from functools import lru_cache
import os

def get_app_env():
    app_env = os.getenv("APP_ENV", "dev")
    return ".env.prod" if app_env == "prod" else ".env"

class Settings(BaseSettings):
    DB_NAME: str
    DB_USERNAME: str
    DB_PASSWORD: str
    DB_HOST: str
    SECRET_KEY: str
    class Config:
        env_file = get_app_env()

@lru_cache()
def get_settings() -> Settings:
    return Settings()
