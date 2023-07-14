import app from './app'
import postgresClient from '../../config/postgres'
import mongoClient from '../../config/mongo'

const { WEB_PORT, ENV } = require('../../config')

let server

async function startServer(server) {
    try {
        // Connect to MongoDB
        await mongoClient.connectToDb()
        console.log('Connected to MongoDB')

        // Connect to PostgreSQL
        await postgresClient.connectToDb()
        console.log('Connected to PostgresDB')

        // Start server
        if (ENV !== 'test') {
            // eslint-disable-next-line no-unused-vars
            server = app.listen(WEB_PORT, () => {
                console.log(`Listening to port ${WEB_PORT}`)
            })
        }
    } catch (error) {
        console.error('Error:', error)

        throw new Error(error.message)
    }
}

process.on('SIGTERM', () => {
    console.log('SIGTERM received')

    if (server) server.close()
})

startServer(server)

export default app
