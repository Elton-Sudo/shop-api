# Use official Node.js image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy the rest of the application
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Command to start the app
CMD ["npm", "run", "dev"]
