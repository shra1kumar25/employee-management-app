# Build stage
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

COPY server.js .
COPY db.js .


# Runtime stage
FROM node:22-alpine

WORKDIR /app

# Copy only production application files
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/server.js .
COPY --from=build /app/db.js .

# Remove npm from the runtime image.
# The application runs directly with node.
RUN rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/bin/npm \
    /usr/local/bin/npx

EXPOSE 5000

CMD ["node", "server.js"]
