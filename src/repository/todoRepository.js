import Todo from '../models/Todo'

export const create = async (params) => {
    const todo = new Todo(params)

    return todo.save()
}

export const get = async (params) => {
    return Todo.findOne(params)
}

export const list = async (filter) => {
    return Todo.find(filter)
}

export const destroy = async (filter) => {
    return Todo.findOneAndDelete(filter)
}

export const update = async (filter, data) => {
    return Todo.findOneAndUpdate(filter, data)
}

export const insertMany = async (data) => {
    return Todo.insertMany(data)
}
