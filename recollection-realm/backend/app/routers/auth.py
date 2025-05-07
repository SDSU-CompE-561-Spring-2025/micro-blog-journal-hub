from fastapi import APIRouter, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.schemas.user import UserCreate
from app.utils.utils import get_password_hash
from app.database import get_db
from app.models import User  # <-- Add this


router = APIRouter()

users_db = {}  # temporary mock DB


class UserCreate(BaseModel):
    username: str
    password: str
    email: str


class AuthData(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(data: AuthData):
    user = users_db.get(data.username)
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "username": data.username}


@router.post("/register")
# def register(data: AuthData):
#    if data.username in users_db:
#        raise HTTPException(status_code=400, detail="User already exists")
#    users_db[data.username] = {"username": data.username, "password": data.password}
#    return {"message": "Registration successful", "username": data.username}
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        User.username == user.username).first()
    if existing_user:
        raise HTTPException(
            status_code=409, detail="Username already registered")

    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, password=hashed_password)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}
