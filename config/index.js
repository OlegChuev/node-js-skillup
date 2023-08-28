require('dotenv').config()

const { NODE_ENV, PORT, WEBSOCKET_PORT, APP_HOST } = process.env

export const WEB_PORT = PORT

export const ENV = NODE_ENV

export const WS_PORT = WEBSOCKET_PORT

export const HOST = APP_HOST
