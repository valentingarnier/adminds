import os

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App URLs
    api_url: str = "http://localhost:8000"
    app_url: str = "http://localhost:3000"

    # OpenAI — read from environment variables
    openai_api_key: str = os.environ.get("OPENAI_API_KEY", "")
    openai_model: str = os.environ.get("OPENAI_MODEL", "gpt-5.4")

    model_config = {"env_file": ".env", "env_file_encoding": "utf-8"}


settings = Settings()
