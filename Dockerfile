# Use the official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the development server
CMD ["npm", "dev"]
