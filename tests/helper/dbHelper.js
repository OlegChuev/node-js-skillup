import mongoose from 'mongoose'

export const clearModelCollectionMongo = async (model) => {
    await model.deleteMany({})
}

export const clearModelCollectionPsql = async (model) => {
    await model.deleteMany({})
}

export const closeConnections = async () => {
    await mongoose.connection.close()
}
