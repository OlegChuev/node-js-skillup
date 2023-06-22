const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const cookieParser = require('cookie-parser')
const connectDB = require('../../config/connectDB').default
const routes = require('../routes/index')

// cookie-parser
app.use(cookieParser('secret'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    next()
})

// Connect to DB
connectDB(() => {
    if (process.env.NODE_ENV === 'test') return

    console.log('Connected to the DB')

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`Server is running and listening on port ${PORT}`)
    })
})

app.use('/', routes)

// celebrate error handler
app.use(errors())

module.exports = app
