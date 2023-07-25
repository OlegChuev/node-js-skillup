require('dotenv').config()

const { NODE_ENV, PORT } = process.env

export const WEB_PORT = PORT

export const ENV = NODE_ENV
