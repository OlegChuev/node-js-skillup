FROM node:20.2.0-alpine

# Install app dependencies
COPY package*.json ./

RUN npm install -g nodemon
RUN npm install

# Bundle app source
COPY . .

CMD ["npm", "run", "dev"]
