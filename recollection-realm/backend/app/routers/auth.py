from fastapi import APIRouter, HTTPException, Depends, status
# Standard way to receive username/password
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

# Assuming these schemas and models are correctly defined
from app.schemas.user import UserCreate, User as UserResponseSchema  # For response
from app.models.user import User as UserModel

# Assuming these utilities are in app.utils.utils
# You will need to implement/ensure these exist:
# - verify_password(plain_password, hashed_password)
# - create_access_token(data={"sub": username, "user_id": id}, expires_delta)
from app.utils.utils import get_password_hash, verify_password, create_access_token

# Corrected import if connection.py holds get_db
from app.database.connection import get_db
# from app.database import get_db # Original, ensure this path is correct for your project

# Mock settings - In a real app, get these from a config file (e.g., app.core.config)
ACCESS_TOKEN_EXPIRE_MINUTES = 30  # Example expiry time

router = APIRouter(
    prefix="/api/auth",  # Standard prefix for auth routes
    tags=["authentication"]
)

# This UserCreate is from the original file, but it's better to use the one from app.schemas.user
# from pydantic import BaseModel
# class UserCreateSchema(BaseModel): # Renamed to avoid conflict if needed
#     username: str
#     password: str
#     email: str


class Token(BaseModel):
    access_token: str
    token_type: str
    username: str  # Optionally return username


@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Logs in a user and returns an access token.
    Uses OAuth2PasswordRequestForm, so client should send 'username' and 'password'
    in form-data.
    """
    user = db.query(UserModel).filter(
        UserModel.username == form_data.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Ensure verify_password is implemented in your utils
    # Assuming field is hashed_password
    if not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # Ensure create_access_token is implemented in your utils
    # The 'sub' (subject) of the token is typically the username.
    # Include any other data needed by get_current_user, e.g., user.id
    access_token = create_access_token(
        data={"sub": user.username, "user_id": user.id},
        expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer", "username": user.username}


# Return user info (without password)
@router.post("/register", response_model=UserResponseSchema)
def register_user(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Registers a new user.
    """
    existing_user_by_username = db.query(UserModel).filter(
        UserModel.username == user_data.username).first()
    if existing_user_by_username:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already registered"
        )

    # Optional: Check for existing email if email should be unique
    # Ensure your UserModel has an email field if UserCreate schema includes it
    if hasattr(user_data, 'email') and user_data.email:
        existing_user_by_email = db.query(UserModel).filter(
            UserModel.email == user_data.email).first()
        if existing_user_by_email:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already registered"
            )

    hashed_password = get_password_hash(user_data.password)

    # Ensure your UserModel fields match (e.g., 'hashed_password', 'email')
    db_user = UserModel(
        username=user_data.username,
        hashed_password=hashed_password,  # Store the hashed password
        email=user_data.email if hasattr(user_data, 'email') else None
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    # Return data based on UserResponseSchema (which should exclude password)
    return db_user
