const express = require('express')

const app = express()

const client = require('./services/mongoose_client')

app.set('view engine', 'ejs')

app.use((req, res, next) => {
    // Pass to next layer of middleware
    next()
})

require('./routes')(app)

module.exports = app
