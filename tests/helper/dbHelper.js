import mongoose from 'mongoose'
import sequelize from '../../config/postgres'

export const clearModelCollectionMongo = async (model) => {
    await model.deleteMany({})
}

export const clearModelCollectionPsql = async (model) => {
    await model.destroy({ where: {} })
}

export const closeConnections = async () => {
    await sequelize.close()
    await mongoose.connection.close()
}
