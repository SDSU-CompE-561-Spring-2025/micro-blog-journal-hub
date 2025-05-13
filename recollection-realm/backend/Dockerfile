# backend/Dockerfile
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Install netcat (nc) to wait for db
RUN apt-get update && apt-get install -y netcat-openbsd && apt-get clean

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy env and code
COPY . .

# Make sure the script is executable inside container
RUN chmod +x start.sh

# Expose FastAPI port
EXPOSE 8000

# Start the FastAPI app with Uvicorn
CMD ["./start.sh"]
