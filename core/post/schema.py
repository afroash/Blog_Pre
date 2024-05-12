from pydantic import BaseModel
from datetime import datetime   
from typing import Optional

class CreateUpdatePost(BaseModel):
    title: str
    content: str
    #created_on: datetime.datetime = None

    
# Additional model to include 'date_added' for response purposes
class Post(CreateUpdatePost):
    id: int
    created_on: datetime

    class Config:
        orm_mode = True
        