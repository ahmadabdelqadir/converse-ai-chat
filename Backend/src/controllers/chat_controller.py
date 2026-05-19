from fastapi import APIRouter, status
from models.message_model import MessageSchema
from services.ai_service import AiService
from services.chat_service import ChatService

router = APIRouter()


# Start a new, empty conversation.
@router.post("/api/conversations", status_code = status.HTTP_201_CREATED)
def create_conversation():
    with ChatService() as service:
        conversation = service.create_conversation()
        return conversation.to_dict()


# Get every message of one conversation.
@router.get("/api/conversations/{conversation_id}/messages")
def get_messages(conversation_id: int):
    with ChatService() as service:
        service.get_conversation(conversation_id)
        messages = service.get_messages(conversation_id)
        return [message.to_dict() for message in messages]


# Send a user message and get the assistant's reply.
@router.post("/api/conversations/{conversation_id}/messages", status_code = status.HTTP_201_CREATED)
def send_message(conversation_id: int, message: MessageSchema):
    with ChatService() as service:

        # Make sure the conversation exists:
        service.get_conversation(conversation_id)

        # Save the user message:
        service.add_message(conversation_id, "user", message.content)

        # Send the whole conversation to OpenAI for an answer in context:
        history = service.get_messages(conversation_id)
        reply = AiService().get_reply(history)

        # Save the assistant message and return it:
        assistant_message = service.add_message(conversation_id, "assistant", reply)
        return assistant_message.to_dict()
