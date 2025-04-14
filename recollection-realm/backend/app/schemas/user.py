from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name = Optional[Str] = None
    bio: Optional[Str] = None
    #inheritor: Optional[Str]  ##(need unique user id)
    
class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None
    bio: Optional[str] = None 

class User(UserBase):
    id: int
    creation_date: datetime

    class Config:
        orm_mode = True
