# Use Node.js 18 Alpine as base image for smaller size
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for better Docker layer caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy all source code
COPY . .

# Build the React application
RUN npm run build

# Install serve globally to serve the built application
RUN npm install -g serve

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S lmsuser -u 1001

# Change ownership of the app directory
RUN chown -R lmsuser:nodejs /app
USER lmsuser

# Expose port 3000
EXPOSE 3000

# Health check to ensure container is running properly
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application using serve
CMD ["serve", "-s", "dist", "-l", "3000"]
