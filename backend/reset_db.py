from sqlalchemy.orm import Session
from app.database.connection import Base, engine
from app.database.init_db import init_db, add_sample_data
from app.database import get_db

def reset_database():
    print("Dropping all tables...")
    Base.metadata.drop_all(bind=engine)
    print("Tables dropped successfully!")

    print("Initializing database...")
    init_db()
    print("Tables created successfully!")

    print("Adding sample data...")
    db = next(get_db())
    add_sample_data(db)
    print("Sample data added successfully!")

if __name__ == "__main__":
    reset_database() 