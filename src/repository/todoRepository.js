import Todo from '../models/Todo'

export const create = async (data) => {
    const todo = new Todo(data)

    return todo.save()
}

export const save = async (todo) => {
    return todo.save()
}

export const get = async (filter) => {
    return Todo.findOne(filter)
}

export const list = async (filter) => {
    return Todo.find(filter)
}

export const destroy = async (filter) => {
    return Todo.findOneAndDelete(filter)
}

export const insertMany = async (data) => {
    return Todo.insertMany(data)
}
