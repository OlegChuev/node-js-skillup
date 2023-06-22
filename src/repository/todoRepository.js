import Todo from '../models/Todo'

export const create = (params) => {
    const todo = new Todo(params)
    return todo.save()
}

export const get = (params) => {
    return Todo.findOne(params)
}

export const list = () => {
    return Todo.find()
}

export const destroy = (id) => {
    return Todo.findByIdAndDelete(id)
}

export const update = (id, data) => {
    return Todo.findByIdAndUpdate(id, data)
}

export const insertMany = (data) => {
    return Todo.insertMany(data)
}
