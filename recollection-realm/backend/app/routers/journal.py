from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database.connection import get_db
from app.models.user import User
from app.models.journal import Journal as JournalModel
from app.schemas.journal import JournalCreate, Journal, JournalUpdate, JournalList
from app.utils.utils import get_current_user

router = APIRouter(prefix="/api/journals", tags=["journals"])

# Create a new journal
@router.post("/", response_model=Journal, status_code=status.HTTP_201_CREATED)
def create_journal(
    journal: JournalCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new journal for the authenticated user.
    """
    # Create new journal with user relationship
    db_journal = JournalModel(
        **journal.dict(),
        user_id=current_user.id
    )
    
    db.add(db_journal)
    db.commit()
    db.refresh(db_journal)
    
    return db_journal

# Get all journals for current user
@router.get("/", response_model=List[Journal])
def get_journals(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100
):
    """
    Retrieve all journals belonging to the authenticated user.
    """
    journals = db.query(JournalModel).filter(
        JournalModel.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    return journals

# Get a specific journal by ID
@router.get("/{journal_id}", response_model=Journal)
def get_journal(
    journal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve a specific journal by ID.
    """
    journal = db.query(JournalModel).filter(
        JournalModel.id == journal_id
    ).first()
    
    if not journal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Journal not found"
        )
    
    # Check ownership or public access
    if journal.user_id != current_user.id and journal.privacy == 0:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden"
        )
    
    return journal

# Update journal details
@router.put("/{journal_id}", response_model=Journal)
def update_journal(
    journal_id: int,
    journal_update: JournalUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update a journal's details.
    """
    db_journal = db.query(JournalModel).filter(
        JournalModel.id == journal_id
    ).first()
    
    if not db_journal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Journal not found"
        )
    
    # Check ownership
    if db_journal.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to update this journal"
        )
    
    # Update journal fields that are provided
    update_data = journal_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_journal, key, value)
    
    db.commit()
    db.refresh(db_journal)
    
    return db_journal

# Delete a journal
@router.delete("/{journal_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_journal(
    journal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a journal.
    """
    db_journal = db.query(JournalModel).filter(
        JournalModel.id == journal_id
    ).first()
    
    if not db_journal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Journal not found"
        )
    
    # Check ownership
    if db_journal.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this journal"
        )
    
    db.delete(db_journal)
    db.commit()
    
    return

# Filter journals by tags/categories
@router.get("/filter", response_model=List[Journal])
def filter_journals(
    tags: Optional[str] = None,
    categories: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Filter journals by tags and/or categories.
    """
    query = db.query(JournalModel).filter(
        JournalModel.user_id == current_user.id
    )
    
    if tags:
        # Simple substring matching for tags
        query = query.filter(JournalModel.tags.contains(tags))
    
    if categories:
        # Simple substring matching for categories
        query = query.filter(JournalModel.categories.contains(categories))
    
    return query.all()

# Add collaborator to journal
@router.post("/{journal_id}/collaborators", status_code=status.HTTP_200_OK)
def add_collaborator(
    journal_id: int,
    collaborator_email: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Add a collaborator to a journal.
    """
    # Find the journal
    journal = db.query(JournalModel).filter(JournalModel.id == journal_id).first()
    if not journal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Journal not found"
        )
    
    # Check ownership
    if journal.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to add collaborators to this journal"
        )
    
    # Find the collaborator by email
    collaborator = db.query(User).filter(User.email == collaborator_email).first()
    if not collaborator:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User with this email not found"
        )
    
    # Add collaborator to journal
    journal.collaborators.append(collaborator)
    db.commit()
    
    return {"success": True}

# Remove collaborator from journal
@router.delete("/{journal_id}/collaborators/{collaborator_id}", status_code=status.HTTP_200_OK)
def remove_collaborator(
    journal_id: int,
    collaborator_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Remove a collaborator from a journal.
    """
    # Find the journal
    journal = db.query(JournalModel).filter(JournalModel.id == journal_id).first()
    if not journal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Journal not found"
        )
    
    # Check ownership
    if journal.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to remove collaborators from this journal"
        )
    
    # Find the collaborator
    collaborator = db.query(User).filter(User.id == collaborator_id).first()
    if not collaborator:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Collaborator not found"
        )
    
    # Remove collaborator from journal
    if collaborator in journal.collaborators:
        journal.collaborators.remove(collaborator)
        db.commit()
    
    return {"success": True}