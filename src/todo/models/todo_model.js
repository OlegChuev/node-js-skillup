import mongoose from 'mongoose'

export const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    isDone: Boolean,
    username: String,
})

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
