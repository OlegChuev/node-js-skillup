const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
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
    },
    email: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

export default User
