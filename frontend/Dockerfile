# Stage 1: Build React application
FROM node:22-alpine AS build

WORKDIR /app

# Copy dependency files first for better layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy application source
COPY . .

# Build production React application
RUN npm run build

# Stage 2: Serve React application with Nginx
FROM nginx:alpine

# Copy production build into Nginx web root
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
