# Use Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install Hatch
RUN pip install --no-cache-dir hatch

# Copy project files
COPY backend .

# Install dependencies using Hatch
RUN hatch env create

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI with Uvicorn
CMD ["hatch", "run", "api:uvicorn app.main:app --host 0.0.0.0 --port 8000"]
