require('dotenv').config()

const config = {
    port: process.env.PORT,
    dbUrlMongoDB: process.env.MONGODB_URL,
    nodeEnv: process.env.NODE_ENV
}

module.exports = config
