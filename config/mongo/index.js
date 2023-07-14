import mongoose from 'mongoose'

const mongoDbClient = mongoose

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, NODE_ENV } =
    process.env

const MONGO_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${NODE_ENV}?authSource=admin`

mongoDbClient.connectToDb = async () => {
    await mongoose.connect(MONGO_URL)
}

export default mongoDbClient
