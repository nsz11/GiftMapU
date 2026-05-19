# Dockerfile — Vibe Backend (Node.js / Express)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy all source files
COPY . .

# Expose the port the server runs on
EXPOSE 3002

# Start the server
CMD ["node", "index.js"]
