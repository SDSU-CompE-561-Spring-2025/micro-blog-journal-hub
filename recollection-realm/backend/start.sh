#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."

# Loop until the db service is reachable on port 5432
while ! nc -z db 5432; do
  sleep 0.5
done

echo "PostgreSQL is up. Starting FastAPI..."

# Start the FastAPI server
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
