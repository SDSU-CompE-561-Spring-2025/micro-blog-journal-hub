from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    username: str  # This is the display name of the user
    email: EmailStr  # Used for login and account recovery
    full_name: Optional[str] = None  # User's full name (optional)
    bio: Optional[str] = None  # Short personal bio


class UserCreate(UserBase):
    password: str  # Plaintext password (will be hashed)


class UserUpdate(BaseModel):
    username: Optional[str] = None  # Allow partial updates
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    bio: Optional[str] = None


class User(UserBase):
    id: int  # Auto-incrementing primary key
    creation_date: datetime  # Date the user registered

    class Config:
        orm_mode = True  # Needed to convert SQLAlchemy objects to Pydantic
