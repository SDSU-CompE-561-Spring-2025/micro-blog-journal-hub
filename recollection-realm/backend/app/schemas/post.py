from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional

class CommentBase(BaseModel):
    text: str

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    user_id: int
    post_id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class PostBase(BaseModel):
    text: str
    image_url: Optional[str] = None
    genre: str

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    user_id: int
    likes: int
    created_at: datetime
    comments: List[Comment] = []
    
    class Config:
        from_attributes = True

class PostResponse(Post):
    username: str  # Include the username in the response 