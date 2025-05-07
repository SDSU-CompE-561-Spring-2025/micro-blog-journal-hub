from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database.connection import Base

# Many-to-many relationship for collaborators
journal_collaborators = Table(
    "journal_collaborators",
    Base.metadata,
    Column("journal_id", Integer, ForeignKey("journals.id"), primary_key=True),
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True)
)

# Many-to-many relationship for inheritors
journal_inheritors = Table(
    "journal_inheritors",
    Base.metadata,
    Column("journal_id", Integer, ForeignKey("journals.id"), primary_key=True),
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True)
)

class Journal(Base):
    __tablename__ = "journals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    privacy = Column(Integer, default=0)  # 0: private, 1: shared, 2: public
    password = Column(String, nullable=True)
    tags = Column(String, nullable=True)
    categories = Column(String, nullable=True)
    creation_date = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship("User", back_populates="journals")
    collaborators = relationship("User", secondary="journal_collaborators")
    inheritors = relationship("User", secondary="journal_inheritors")
    entries = relationship("Entry", back_populates="journal")

