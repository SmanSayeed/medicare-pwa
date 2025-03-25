# Use the official Node.js image
FROM node:14

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Set environment based on build arguments
ARG NODE_ENV
COPY .env.$NODE_ENV .env

# Expose app on port 3000 and start it
EXPOSE 3000
CMD ["npm", "start"]