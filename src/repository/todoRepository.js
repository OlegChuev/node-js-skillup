import Todo from '../models/Todo'

export const create = async (params) => {
    const todo = new Todo(params)

    return todo.save()
}

export const get = async (params) => {
    return Todo.findOne(params)
}

export const list = async () => {
    return Todo.find()
}

export const destroy = async (id) => {
    return Todo.findByIdAndDelete(id)
}

export const update = async (id, data) => {
    return Todo.findByIdAndUpdate(id, data)
}

export const insertMany = async (data) => {
    return Todo.insertMany(data)
}
