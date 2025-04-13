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
    id: int
    name: str
    email: EmailStr
    password: str
    creation_date: datetime
    inheritor: Optional[int]

class JournalBase(BaseModel):       #foreign key somewhere
    id: int
    title: str
    keywords: Optional[str]
    creation_date: datetime
    #password?
    #other fields?

class JournalCreate(BaseModel):
    id: int
    title: str
    creation_date: datetime
    privacy: int
    password: str

class JournalRead(BaseModel):
    title: str
    keywords: Optional[str]
    creation_date: datetime

class EntryBase(BaseModel):         #foreign key somewhere
    id: int
    title: str
    creation_date: datetime
    keywords: Optional[str]
    comment: str
    password: str

class EntryCreate(BaseModel):
    id: int
    title: str
    privacy: int
    password: str
    creation_date: datetime

class EntryRead(BaseModel):
    title: str
    keywords: Optional[str]
    creation_date: datetime






