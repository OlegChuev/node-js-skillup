const express = require('express')
const app = express()

app.use((req, res, next) => {
    // Pass to next layer of middleware
    next()
})

require('./routes')(app)

module.exports = app
