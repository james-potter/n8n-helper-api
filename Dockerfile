# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Install TypeScript globally (to ensure `tsc` is available)
RUN npm install -g typescript

# Copy source files
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]
