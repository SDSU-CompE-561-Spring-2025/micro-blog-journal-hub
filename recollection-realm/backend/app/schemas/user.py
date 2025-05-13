from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    username: str  # This is the display name of the user
    email: EmailStr  # Used for login and account recovery
    full_name: Optional[str] = None  # User's full name (optional)
    bio: Optional[str] = None  # Short personal bio


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    inheritor: Optional[int] = None


class UserUpdate(BaseModel):
    username: Optional[str] = None  # Allow partial updates
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    bio: Optional[str] = None


class User(UserBase):
    id: int  # Auto-incrementing primary key
    creation_date: datetime  # Date the user registered


class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    bio: Optional[str] = None
    creation_date: datetime

    class Config:
        orm_mode = True  # Needed to convert SQLAlchemy objects to Pydantic
