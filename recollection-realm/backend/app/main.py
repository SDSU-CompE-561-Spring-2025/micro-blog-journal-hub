from fastapi import FastAPI
from app.database import engine, Base, connection
from app.routers import journal, user, entry, auth, post
from fastapi.middleware.cors import CORSMiddleware


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
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(post.router, tags=["posts"])  # No prefix needed as it's defined in the router

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to RecollectionRealm API"}
