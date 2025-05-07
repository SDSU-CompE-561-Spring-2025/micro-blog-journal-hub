from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class EntryBase(BaseModel):
    title: str
    content: str
    description: Optional[str] = None
    privacy: int = Field(default=0, ge=0, le=2)
    tags: Optional[str] = None
    categories: Optional[str] = None

class EntryCreate(EntryBase):
    journal_id: int
    password: Optional[str] = None

class EntryUpdate(BaseModel):
    title: Optional[str] = None
    content:  Optional[str] = None
    description: Optional[str] = None
    privacy: Optional[int] = None
    tags: Optional[str] = None
    categories: Optional[str] = None
    password: Optional[str] = None

class Entry(BaseModel):
    id: int
    creation_date: datetime
    journal_id: int
    user_id: int

    class Config:
        orm_mode = True

class EntryList(BaseModel):
    entries: List[Entry]

    class Config:
        orm_mode = True
