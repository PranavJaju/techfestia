# Use an official Node.js runtime as a parent image
FROM node:16-alpine3.14

# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to /usr/src/app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .


# Define the command to run your application
CMD ["npm", "run","dev"]
