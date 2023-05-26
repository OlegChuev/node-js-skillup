const app = require('./app')

const config = require('./config')

const PORT = process.env.PORT || config.port

const server = app.listen(PORT, () => {
    console.log(
        'Server is running and listening on port',
        server.address().port
    )
})
