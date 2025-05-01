from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from models.user import UserCreate

auth_router = APIRouter()

users_db = {}  # temporary mock DB

class UserCreate(BaseModel):
    username: str
    password: str
    email: str

class AuthData(BaseModel):
    username: str
    password: str

@auth_router.post("/login")
def login(data: AuthData):
    user = users_db.get(data.username)
    if not user or user["password"] != data.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "username": data.username}

@auth_router.post("/register")
def register(data: AuthData):
    if data.username in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    users_db[data.username] = {"username": data.username, "password": data.password}
    return {"message": "Registration successful", "username": data.username}
