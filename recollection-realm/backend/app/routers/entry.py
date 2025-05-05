from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database.connection import get_db
from app.models.entry import Entry as EntryModel
from app.schemas.entry import EntryCreate, EntryUpdate, Entry as EntryOut
from app.utils.utils import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/api/entries",
    tags=["entries"]
)

# Create an entry


@router.post("/", response_model=EntryOut, status_code=status.HTTP_201_CREATED)
def create_entry(
    entry: EntryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_entry = EntryModel(**entry.dict(), user_id=current_user.id)
    db.add(db_entry)
    db.commit()
    db.refresh(db_entry)
    return db_entry

# Get all entries for current user


@router.get("/", response_model=List[EntryOut])
def get_entries(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(EntryModel).filter(EntryModel.user_id == current_user.id).all()

# Get a specific entry by ID


@router.get("/{entry_id}", response_model=EntryOut)
def get_entry(entry_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    entry = db.query(EntryModel).filter(EntryModel.id == entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    if entry.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    return entry

# Update an entry


@router.put("/{entry_id}", response_model=EntryOut)
def update_entry(
    entry_id: int,
    entry_update: EntryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_entry = db.query(EntryModel).filter(EntryModel.id == entry_id).first()
    if not db_entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    if db_entry.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    update_data = entry_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_entry, key, value)

    db.commit()
    db.refresh(db_entry)
    return db_entry

# Delete an entry


@router.delete("/{entry_id}", response_model=dict)
def delete_entry(
    entry_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    entry = db.query(EntryModel).filter(EntryModel.id == entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    if entry.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")

    db.delete(entry)
    db.commit()
    return {"success": True}
