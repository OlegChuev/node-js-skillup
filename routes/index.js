const express = require('express')

const todoApi = require('../src/todo/routes')
const mainPage = require('../src/main/routes')

module.exports = (app) => {
    app.use('/todo', todoApi)
    app.use('/', mainPage)

    // 404 if route is not found
    app.use('*', (req, res) => {
        res.status(400)
        res.send('Unknown route')
    })

    app.use('/assets', express.static('./public'))
}
