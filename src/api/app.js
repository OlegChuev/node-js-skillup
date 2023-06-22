const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const cookieParser = require('cookie-parser')
const routes = require('../routes/index')

// cookie-parser
app.use(cookieParser('secret'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    next()
})

app.use('/', routes)

// celebrate error handler
app.use(errors())

module.exports = app
