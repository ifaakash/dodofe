# Base image
FROM node:18.20-alpine
WORKDIR /app

# install the required build packages that are not in slim image and pnpm
RUN npm install -g pnpm

# Copy and install dependencies
COPY package*.json ./
RUN pnpm i

# copy the rest application code
COPY . .

#backedn code has port 3000
EXPOSE 3000

# Run the application in DEV mode
CMD ["pnpm", "dev"]