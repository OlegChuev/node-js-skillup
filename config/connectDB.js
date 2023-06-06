const mongoose = require('mongoose')
const config = require('../config')

const dbUrl = config.dbUrlMongoDB

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.nodeEnv
        })
    } catch (err) {
        console.error(`Error: ${err}`)
    }
}

module.exports = connectDB
