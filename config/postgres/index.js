const { Sequelize } = require('sequelize')

const {
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
    NODE_ENV
} = process.env

const PSQL_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${NODE_ENV}`

const psqlClient = new Sequelize(PSQL_URL, {
    dialect: 'postgres',
    logging: false
})

psqlClient.connectToDb = async () => {
    await psqlClient.sync()
}

export default psqlClient
