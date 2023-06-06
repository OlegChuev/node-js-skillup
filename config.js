require('dotenv').config()

const config = {
    port: 3000,
    dbUrlMongoDB: process.env.MONGODB_URL,
    nodeEnv: process.env.NODE_ENV
}

module.exports = config
