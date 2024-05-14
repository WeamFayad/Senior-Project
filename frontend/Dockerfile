# Use a node base image
FROM node:16 as build-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your React app
RUN npm run build

# Stage 2: Serve the React application from Nginx
FROM nginx:stable-alpine
# Ensure the path here matches the output directory from the build stage
COPY --from=build-stage /app/build/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx and keep it running
CMD ["nginx", "-g", "daemon off;"]