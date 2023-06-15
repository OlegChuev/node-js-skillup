import mongoose from 'mongoose'

export const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
})

const User = mongoose.model('User', userSchema)

export default User
