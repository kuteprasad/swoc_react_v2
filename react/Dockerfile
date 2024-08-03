# Use the official Node.js image from the Docker Hub
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy only the package.json and package-lock.json first
# This helps with Docker layer caching to avoid reinstalling node_modules unnecessarily
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
