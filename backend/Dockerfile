FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 5001
EXPOSE 5001

# Start the application
CMD ["npm", "run", "dev"]