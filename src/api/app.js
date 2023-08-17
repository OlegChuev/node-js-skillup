const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const cookieParser = require('cookie-parser')

const RateLimit = require('express-rate-limit')
const { errorHandler, errorConverter } = require('../middleware/errorHandler')

const routes = require('../routes/index')

const { ENV } = require('../../config')

// set up rate limiter
const limiter = RateLimit({
    windowMs: 1000, // 1 second
    max: ENV === 'test' ? 100 : 5
})

// apply rate limiter to all requests
app.use(limiter)

// cookie-parser
app.use(cookieParser())

app.use(bodyParser.urlencoded({ extended: true }))

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === '/api/payment/webhook/') {
        next()
    } else {
        bodyParser.json()(req, res, next)
    }
})

// Need for correct work of FE part
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )

    next()
})

app.use('/', routes)

// convert error to ApiError, if needed
app.use(errorConverter)

// Handle error
app.use(errorHandler)

// Error handlers
app.use(errors())

module.exports = app
