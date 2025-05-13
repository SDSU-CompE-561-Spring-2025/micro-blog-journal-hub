from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    inheritor = Column(Integer, unique=True, nullable=True)
    creation_date = Column(DateTime, default=datetime.utcnow)

    journals = relationship("Journal", back_populates="owner")
    entries = relationship("Entry", back_populates="author")


class Journal(Base):
    __tablename__ = "journals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    privacy = Column(Integer, nullable=False)
    password = Column(String, nullable=False)
    keywords = Column(String, nullable=True)
    creation_date = Column(DateTime, default=datetime.utcnow)

    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    owner = relationship("User", back_populates="journals")
    entries = relationship("Entry", back_populates="journal")


class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    privacy = Column(Integer, nullable=False)
    password = Column(String, nullable=False)
    keywords = Column(String, nullable=True)
    creation_date = Column(DateTime, default=datetime.utcnow)

    author_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    journal_id = Column(Integer, ForeignKey("journals.id"), nullable=False)

    author = relationship("User", back_populates="entries")
    journal = relationship("Journal", back_populates="entries")
