const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./services/mongoose_client')

app.set('view engine', 'ejs')

app.use((req, res, next) => {
    // Pass to next layer of middleware
    next()
})

require('./routes')(app)

module.exports = app
