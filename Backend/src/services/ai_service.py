from openai import OpenAI
from models.message_model import MessageModel
from utils.app_config import AppConfig

# Tells the model how to behave in every conversation.
SYSTEM_PROMPT = "You are a helpful, friendly assistant. Answer clearly and concisely."


# Talks to the OpenAI API. The API key stays here on the server side.
class AiService:

    # Ctor: build the OpenAI client with the key from the .env file.
    def __init__(self) -> None:
        self.client = OpenAI(api_key = AppConfig.openai_api_key)

    # Send the whole conversation to OpenAI and return the assistant's reply.
    # The full history is sent every time, so the model keeps the context.
    def get_reply(self, history: list[MessageModel]) -> str:

        # Start with the system prompt, then add every past message:
        messages = [{ "role": "system", "content": SYSTEM_PROMPT }]
        for message in history:
            messages.append({ "role": message.role, "content": message.content })

        # Ask the model for an answer:
        response = self.client.chat.completions.create(
            model = AppConfig.openai_model,
            messages = messages
        )

        # Return the reply text (or an empty string if the model returned none):
        return response.choices[0].message.content or ""
