#ignore this file


from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base          #revise
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    inheritor = Column(Integer, unique=True, nullable=True)
    creation_date = Column(DateTime, deafault=datetime.utcnow)

    journals = relationship("Journal", back_populates="users")
    entries = relationship("Entry", back_populates="users")

class Journal(Base):
    __tablename__ = "journals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    privacy = Column(Integer, nullable=False)
    password = Column(String, nullable=False)
    keywords = Column(String, nullable=True)
    creation_date = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", back_populates="journals")
    entries = relationship("Entry", back_populates="journals")

class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    privacy = Column(Integer, nullable=False)
    password = Column(String, nullable=False)
    keywords = Column(String, nullable=True)
    creation_date = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", back_populates="journals")
    journals = relationship("Entry", back_populates="journals")