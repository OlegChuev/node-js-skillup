require('dotenv').config()

const config = {
    port: 3000,
    dbUrlMongoDB: process.env.MONGODB_URL,
}

module.exports = config
