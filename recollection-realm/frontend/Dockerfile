# Use Debian-based Node image for compatibility
FROM node:18-slim

# Set working directory
WORKDIR /app

# Install dependencies required by node modules (like sharp, etc.)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
