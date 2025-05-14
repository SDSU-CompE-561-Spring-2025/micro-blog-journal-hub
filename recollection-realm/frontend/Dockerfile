# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy rest of the app
COPY . .

# Expose the default Next.js port
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "run", "dev"]
