import { connect } from 'mongoose'
import { url } from './db.config'

const connectDB = async () => {
    try {
        await connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (err) {
        console.error(`Error: ${err}`)

        throw new Error(err.message)
    }
}

export default connectDB
