from fastapi import FastAPI
from database.connection import engine, Base
from routers import journal, user, entry 


# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="RecollectionRealm API",
    description="API for the RecollectionRealm personal journal platform",
    version="0.1.0"
)

# Include routers
app.include_router(user.router, prefix="/users", tags=["users"])
app.include_router(journal.router, prefix="/journals", tags=["journals"])
app.include_router(entry.router, prefix="/entries", tags=["entries"])


# Root endpoint

@app.get("/")
def read_root():
    return {"message": "Welcome to RecollectionRealm API"}

