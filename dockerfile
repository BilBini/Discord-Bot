# Use official Node.js runtime as a parent image
FROM node:20-alpine

# Set environment variables
ENV NODE_ENV=production
ENV BOT_ENV=production

# Create and set working directory
WORKDIR /app

# Copy package files
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies
RUN npm install --production

# Copy source files
COPY . .

# Build TypeScript files
RUN npm run build

# Expose port (if needed)
# EXPOSE 3000

# Run the bot
CMD ["npm", "start"]