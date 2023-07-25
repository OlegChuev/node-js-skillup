import Todo from '../models/Todo'

export const create = async (data) => {
    const todo = new Todo(data)

    return todo.save()
}

export const get = async (userId, filter) => {
    return Todo.userHaveAccess(userId).findOne(filter)
}

export const list = async (userId, filter) => {
    return Todo.userHaveAccess(userId).find(filter)
}

export const destroy = async (userId, filter) => {
    return Todo.userHaveAccess(userId).findOneAndDelete(filter)
}

export const update = async (userId, filter, data) => {
    return Todo.userHaveAccess(userId).findOneAndUpdate(filter, data, {
        returnOriginal: false
    })
}

export const insertMany = async (data) => {
    return Todo.insertMany(data)
}
