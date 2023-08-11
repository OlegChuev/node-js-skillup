import app from './app'
import mongoClient from '../../config/mongo'

import logger from '../../config/winston'

const { WEB_PORT, ENV } = require('../../config')

const ws = require('./ws')

let server

async function startServer(server) {
    try {
        // Connect to MongoDB
        await mongoClient.connectToDb()
        logger.info('Connected to MongoDB')

        // Start server
        if (ENV !== 'test') {
            // eslint-disable-next-line no-unused-vars
            server = app.listen(WEB_PORT, () => {
                logger.info(`Listening to port ${WEB_PORT}`)
            })
        }
    } catch (error) {
        logger.error('Error:', error)

        throw new Error(error.message)
    }
}

process.on('SIGTERM', () => {
    logger.info('SIGTERM received')

    if (server) server.close()
})

startServer(server)

export default app
