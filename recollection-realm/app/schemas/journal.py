from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

# Base schema for journal properties
class JournalBase(BaseModel):
    title: str
    description: Optional[str] = None
    privacy: int = Field(default=0, ge=0, le=2)  # 0=private, 1=shared, 2=public
    tags: Optional[str] = None
    categories: Optional[str] = None

# Schema for creating a journal
class JournalCreate(JournalBase):
    password: Optional[str] = None  # Optional password for journal access

# Schema for updating a journal
class JournalUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    privacy: Optional[int] = None
    tags: Optional[str] = None
    categories: Optional[str] = None
    password: Optional[str] = None

# Schema for response with journal data
class Journal(JournalBase):
    id: int
    creation_date: datetime
    user_id: int

    class Config:
        orm_mode = True

# Schema for listing journals
class JournalList(BaseModel):
    journals: List[Journal]
    
    class Config:
        orm_mode = True