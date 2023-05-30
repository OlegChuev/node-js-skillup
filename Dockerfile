FROM node:20.2.0-alpine

ARG NODE_OPTIONS=--max_old_space_size=8192

WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "run", "dev"]
