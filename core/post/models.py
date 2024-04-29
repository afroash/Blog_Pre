from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from database import Base

class Post(Base):
    __tablename__ = "posts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, index=True)
    content = Column(String,index=True)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    author = relationship("User", backref="post")

    def to_dict(self):
        return {
            "id": str(self.id),
            "title": self.title,
            "content": self.content,
            "author_username": self.author.username if self.author else None
            # Include the author's username. If the author is not loaded or None, it returns None.
        }