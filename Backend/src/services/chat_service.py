from fastapi import HTTPException, status
from models.conversation_model import ConversationModel
from models.message_model import MessageModel
from utils.dal import Dal


# Handles every database action for conversations and messages.
class ChatService:

    # Ctor: open a database session.
    def __init__(self) -> None:
        self.dal = Dal()
        self.session = self.dal.create_session()

    # Create a new, empty conversation:
    def create_conversation(self) -> ConversationModel:
        conversation = ConversationModel()
        self.session.add(conversation)
        self.session.commit()
        self.session.refresh(conversation)
        return conversation

    # Get one conversation, or raise 404 if it does not exist:
    def get_conversation(self, conversation_id: int) -> ConversationModel:
        conversation = self.session.get(ConversationModel, conversation_id)
        if not conversation:
            raise HTTPException(
                status_code = status.HTTP_404_NOT_FOUND,
                detail = f"Conversation {conversation_id} not found."
            )
        return conversation

    # Get every message of a conversation, oldest first:
    def get_messages(self, conversation_id: int) -> list[MessageModel]:
        messages = self.session.query(MessageModel) \
            .filter(MessageModel.conversation_id == conversation_id) \
            .order_by(MessageModel.id) \
            .all()
        return messages

    # Add one message to a conversation:
    def add_message(self, conversation_id: int, role: str, content: str) -> MessageModel:
        message = MessageModel(conversation_id = conversation_id, role = role, content = content)
        self.session.add(message)
        self.session.commit()
        self.session.refresh(message)
        return message

    # Closing:
    def close(self):
        self.session.close()

    # Enable "with":
    def __enter__(self):
        return self

    # Exit "with":
    def __exit__(self, exc_type, exc, tb):
        self.session.close()
