# ignore this file


from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class UserBase(BaseModel):
    id: int
    name: str
    email: EmailStr
    password: str
    creation_date: datetime
    inheritor: Optional[int]


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    inheritor: Optional[int] = None


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    inheritor: Optional[int] = None


class JournalBase(BaseModel):  # foreign key somewhere
    id: int
    title: str
    keywords: Optional[str]
    creation_date: datetime
    # password?
    # other fields?


class JournalCreate(BaseModel):
    title: str
    privacy: int
    password: str
    keywords: Optional[str] = None


class JournalRead(BaseModel):
    title: str
    keywords: Optional[str]
    creation_date: datetime


class EntryBase(BaseModel):  # foreign key somewhere
    id: int
    title: str
    creation_date: datetime
    keywords: Optional[str]
    comment: str
    password: str


class EntryCreate(BaseModel):
    title: str
    privacy: int
    password: str
    keywords: Optional[str] = None
    comment: Optional[str] = None  # only if used in DB


class EntryRead(BaseModel):
    title: str
    keywords: Optional[str]
    creation_date: datetime
