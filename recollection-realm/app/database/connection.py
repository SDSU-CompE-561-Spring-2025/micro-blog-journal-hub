from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

#Declaring env variable to connect to database
DATABASE_USERNAME = os.getenv("DB_USER","postgres")
DATABASE_PASSWORD = os.getenv("DB_PASSWORD","postgres")
DATABASE_HOST = os.getenv("DB_HOST","localhost")
DATABASE_PORT = os.getenv("DB_PORT","5432")
DATABASE_NAME = os.getenv("DB_NAME","recollectionrealm")

#Delaring DB url 
SQLALCHEMY_DATABASE_URL = f"postgresql://{DATABASE_USERNAME}:{DATABASE_PASSWORD}@{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"


#Create engine for Postgresql
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

#Database session dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()