from pydantic import BaseModel
from typing import Optional

class CreateUpdatePost(BaseModel):
    title: str
    content: str
