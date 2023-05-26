FROM node:20.2.0-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "run", "dev"]
