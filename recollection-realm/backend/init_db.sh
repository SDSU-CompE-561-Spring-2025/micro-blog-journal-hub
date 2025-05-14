#!/bin/bash
echo "Initializing database..."
python -c "from app.database.init_db import init_db, add_sample_data; from app.database import get_db; init_db(); db = next(get_db()); add_sample_data(db)"
echo "Database initialization complete!" 