const express = require('express')

const app = express()

app.use('/api/todo(s)?', require('./todoRoutes'))
app.use('/api/user(s)?', require('./userRoutes'))
app.use('/auth', require('./authRoutes'))

// static files
app.use('/assets', express.static('../public/'))

// 404 if route is not found
app.use('*', (req, res) => {
    res.status(404)
    res.send('Unknown route')
})

module.exports = app
