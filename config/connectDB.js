import { connect } from 'mongoose'
import { dbUrlMongoDB, nodeEnv } from '.'

const dbUrl = dbUrlMongoDB

const connectDB = async () => {
    try {
        await connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: nodeEnv
        })
    } catch (err) {
        console.error(`Error: ${err}`)

        throw new Error(err.message)
    }
}

export default connectDB
