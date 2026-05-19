from dotenv import load_dotenv
from os import getenv

# Load the variables from the .env file into the environment.
load_dotenv()


# Reads every setting the app needs from environment variables, in one place.
class AppConfig:

    connection_string: str = str(getenv("CONNECTION_STRING"))
    openai_api_key: str = str(getenv("OPENAI_API_KEY"))
    openai_model: str = str(getenv("OPENAI_MODEL") or "gpt-4o-mini")
