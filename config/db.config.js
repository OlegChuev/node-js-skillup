require('dotenv').config()

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, NODE_ENV } = process.env

// eslint-disable-next-line import/prefer-default-export
export const url = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${NODE_ENV}?authSource=admin`
