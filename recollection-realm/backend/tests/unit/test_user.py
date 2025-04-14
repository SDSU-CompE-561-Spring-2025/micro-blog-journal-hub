import pytest
from fastapi.testclient import TestClient
from app.schemas.user import UserBase, UserCreate, UserUpdate, User

@pytest.fixture
def values():
    return {
        "email": "test@gamail.com"
        "username": "examplename"
        "full_name": "John Doe"
        "password": "securepassword"
        "bio": "testing testing testing"
    }

def test_create_user(values):
    assert user.email == values["email"]
    assert user.username == values["username"]
    assert user.full_name == values["full_name"]
