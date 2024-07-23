# Use the official Node.js image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package*.json ./

# Install dependencies
<<<<<<< HEAD
RUN npm install
=======
RUN yarn install
>>>>>>> origin/master

# Copy all files
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the development server
<<<<<<< HEAD
CMD ["npm", "dev"]
=======
CMD ["yarn", "dev"]
>>>>>>> origin/master
