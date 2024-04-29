from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import uuid
from database import Base
from datetime import datetime, timedelta
from config import get_settings
import bcrypt
import jwt

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)    

    def hash_password(self, password: str):
        self.hashed_password = bcrypt.hashpw(password.encode('utf-8'), 
                                             bcrypt.gensalt()).decode('utf-8')
    
    def verify_password(self, password: str):
        return bcrypt.checkpw(password.encode('utf-8'), 
                              self.hashed_password.encode('utf-8'))

    def generate_token(self):
        expiration_time = datetime.utcnow() + timedelta(hours=24)
        payload = {
            "sub": str(self.id),
            "exp": expiration_time
        }
        settings = get_settings()
        return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")




