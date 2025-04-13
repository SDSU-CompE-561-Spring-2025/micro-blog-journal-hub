from fastapi import FastAPI
from app.database.connection import engine, Base
from app.routers import journal

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RecollectionRealm API",
    description="API for the RecollectionRealm personal journal platform",
    version="0.1.0"
)

# Include routers
app.include_router(user.router)
app.include_router(journal.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to RecollectionRealm API"}


ip.com/user /journal