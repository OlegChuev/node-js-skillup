FROM node:20.2.0-alpine

ARG NODE_OPTIONS=--max_old_space_size=8192

WORKDIR /app

# Install app dependencies
COPY package*.json ./

# Generated prisma files
COPY prisma ./prisma/

RUN npm install -g nodemon
RUN npm install

RUN npx prisma generate

# Bundle app source
COPY . .

CMD ["bash"]
