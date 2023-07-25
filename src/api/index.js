import app from './app'
import postgresClient from '../../config/postgres'
import mongoClient from '../../config/mongo'

import logger from '../../config/winston'

const { WEB_PORT, ENV } = require('../../config')

let server

async function startServer(server) {
    try {
        // Connect to MongoDB
        await mongoClient.connectToDb()
        logger.info('Connected to MongoDB')

        // Connect to PostgreSQL
        await postgresClient.connectToDb()
        logger.info('Connected to PostgresDB')

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
