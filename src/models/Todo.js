const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false
    },
    userIds: {
        type: Array,
        required: true
    }
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
