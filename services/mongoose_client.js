const mongoose = require('mongoose')

const config = require('../config')

const dbUrl = config.dbUrlMongoDB

mongoose
    .connect(
        dbUrl,
        { useNewUrlParser: true, useUnifiedTopology: true } // To avoid deprecated options
    )
    .then(() => console.log('MongodDB connected'))
    .catch((e) => console.log(e))

module.exports = mongoose
