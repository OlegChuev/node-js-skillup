const test = require('../src/test/routes')

module.exports = (app) => {
    // app.use('/some-endpoint', require('../src/end-point/routes'))
    app.use('/test', test)

    // 404 if route is not found
    app.use('*', (req, res) => {
        res.status(400)
        res.send('Unknown route')
    })
}
