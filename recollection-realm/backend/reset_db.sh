#!/bin/bash
echo "Resetting database..."

# Drop and recreate the database
python -c "from app.database.connection import engine, Base; Base.metadata.drop_all(bind=engine); Base.metadata.create_all(bind=engine)"

# Run the initialization script
python -c "from app.database.init_db import init_db, add_sample_data; from app.database import get_db; init_db(); db = next(get_db()); add_sample_data(db)"

echo "Database reset complete!" 