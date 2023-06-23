import mongoose from 'mongoose'
import app from './app'

const config = require('../../config')

let server

// Used as a reference:
// https://github.com/saisilinus/node-express-mongoose-typescript-boilerplate/blob/master/src/index.ts
mongoose.connect(config.url).then(() => {
    if (process.env.NODE_ENV === 'test') return

    console.log('Connected to the DB')

    server = app.listen(config.port, () => {
        console.log(`Listening to port ${config.port}`)
    })
})

process.on('SIGTERM', () => {
    console.log('SIGTERM received')

    if (server) server.close()
})

export default app
