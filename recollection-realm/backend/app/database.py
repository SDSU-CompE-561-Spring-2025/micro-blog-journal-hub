from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker #maybe more
#other imports

engine = create_engine() #<-- fill in
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#other stuff