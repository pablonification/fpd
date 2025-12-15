# ================================
# 1. Base builder image
# ================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json & lock file
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy all source code
COPY . .

# Build Next.js
RUN npm run build


# ================================
# 2. Runner image (final)
# ================================
FROM node:20-alpine AS runner

WORKDIR /app

# Add a non-root user for security
RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp

# Copy built files from builder
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/node_modules ./node_modules

# Expose port for Next.js
EXPOSE 3000

# Run as non-root user
USER nodeapp

# Start Next.js in production mode
CMD ["npm", "start"]
