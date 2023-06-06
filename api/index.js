const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { errors } = require('celebrate')
const cookieParser = require('cookie-parser')
const connectDB = require('../config/connectDB')
const config = require('../config.js')

// cookie-parser
app.use(cookieParser('secret'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    // Pass to next layer of middleware
    next()
})

// Connect to DB
connectDB()

// Once successfully connected to DB -> start server
mongoose.connection.once('connected', () => {
    console.log('Connected to the DB')

    const PORT = process.env.PORT || config.port

    app.listen(PORT, () => {
        console.log(`Server is running and listening on port ${PORT}`)
    })
})

// celebrate error handler
app.use(errors())

// todo's routes
app.use('/api/todo(s)?', require('../routes/todoRoutes'))

// user's routes
app.use('/api/user(s)?', require('../routes/userRoutes'))

// auth routes
app.use('/auth', require('../routes/authRoutes'))

// static files
app.use('/assets', express.static('../public/'))

// 404 if route is not found
app.use('*', (req, res) => {
    res.status(400)
    res.send('Unknown route')
})

module.exports = app
