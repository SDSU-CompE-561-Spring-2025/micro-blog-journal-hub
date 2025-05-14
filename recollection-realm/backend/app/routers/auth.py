from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import timedelta

from app.schemas.user import UserCreate
from app.database import get_db
from app.models.user import User
from app.utils.utils import get_password_hash, verify_password, create_access_token

router = APIRouter()

# Request body schema for login


class AuthData(BaseModel):
    username: str  # user enters email as 'username'
    password: str

# REGISTER ROUTE


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=409, detail="Email already registered")

    hashed_password = get_password_hash(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password,
       # inheritor_id=user.inheritor_id
        #creation_date=user.creation_date 
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Generate access token
    access_token = create_access_token(
        data={"sub": str(new_user.id)},
        expires_delta=timedelta(minutes=30)
    )

    return {
        "message": "User registered successfully",
        "user_id": new_user.id,
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }
    }

# LOGIN ROUTE


@router.post("/login")
def login(auth_data: AuthData, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == auth_data.username).first()
    if not user or not verify_password(auth_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Generate access token
    access_token = create_access_token(
        data={"sub": str(user.id)},
        expires_delta=timedelta(minutes=30)
    )

    return {
        "message": "Login successful",
        "user_id": user.id,
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }
