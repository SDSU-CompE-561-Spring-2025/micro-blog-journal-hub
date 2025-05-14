#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."

# Loop until the db service is reachable on port 5432
while ! nc -z db 5432; do
  sleep 0.5
done

echo "PostgreSQL is up. Initializing database..."

# Initialize the database with sample data
python -c "from app.database.init_db import init_db, add_sample_data; from app.database import get_db; init_db(); db = next(get_db()); add_sample_data(db)"

echo "Database initialized. Starting FastAPI..."

# Start the FastAPI server
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
