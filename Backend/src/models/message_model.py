from datetime import datetime
from pydantic import BaseModel as BaseSchema, Field
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from utils.dal import BaseModel


# Schema for the message body the client sends when chatting.
class MessageSchema(BaseSchema):
    content: str = Field(min_length = 1, max_length = 4000)


# Model for the messages table. One row is one message.
# The role column records who said it: "user" or "assistant".
class MessageModel(BaseModel):

    __tablename__ = "messages"

    id = Column(Integer, primary_key = True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"), nullable = False)
    role = Column(String(20), nullable = False)
    content = Column(Text, nullable = False)
    created_at = Column(DateTime, nullable = False, default = datetime.now)

    conversation = relationship("ConversationModel", back_populates = "messages")

    # Convert the row into a plain dictionary for a clean JSON response.
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "conversation_id": self.conversation_id,
            "role": self.role,
            "content": self.content,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
