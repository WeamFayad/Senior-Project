# Use a node base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Copy the rest of your app's source code
COPY . .

# RUN echo 'nameserver 8.8.8.8' > /etc/resolv.conf && \
#     npm config set registry http://registry.npmjs.org/ && \
#     npm install

# Your application's default port, adjust if it's different
EXPOSE 8000

# Command to run your application
CMD ["nodemon", "index.js"]
