from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database.connection import Base

    
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    creation_date = Column(DateTime, default=datetime.utcnow)
    inheritor_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Relationships
    journals = relationship("Journal", back_populates="owner")
    inherited_journals = relationship("Journal", secondary="journal_inheritors")
    collaborators = relationship("JournalCollaborator", back_populates="user")