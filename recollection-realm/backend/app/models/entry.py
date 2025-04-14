from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.connection import Base

class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    privacy = Column(Integer, default=0)  # 0=private, 1=shared, 2=public
    creation_date = Column(DateTime, default=datetime.utcnow)
    journal_id = Column(Integer, ForeignKey("journals.id"), nullable=False)
    
    # Relationships
    journal = relationship("Journal", back_populates="entries")