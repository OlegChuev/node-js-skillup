import mongoose from 'mongoose'

export const todoSchema = mongoose.Schema({
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
    username: {
        type: String,
        required: true
    }
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
