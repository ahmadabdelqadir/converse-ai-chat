from datetime import datetime
from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship
from utils.dal import BaseModel


# Model for the conversations table. One row is one chat.
class ConversationModel(BaseModel):

    __tablename__ = "conversations"

    id = Column(Integer, primary_key = True)
    title = Column(String(255), nullable = True)
    created_at = Column(DateTime, nullable = False, default = datetime.now)

    # Every message that belongs to this conversation:
    messages = relationship(
        "MessageModel",
        back_populates = "conversation",
        cascade = "all, delete-orphan"
    )

    # Convert the row into a plain dictionary for a clean JSON response.
    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "title": self.title,
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
