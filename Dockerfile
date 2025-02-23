# Base image
FROM node:18.20-alpine
WORKDIR /app

# Copy package.json and package-lock.json, then install dependencies using npm
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 for the backend server
EXPOSE 3000

# Run the application in development mode using npm
CMD ["npm", "run", "dev"]
