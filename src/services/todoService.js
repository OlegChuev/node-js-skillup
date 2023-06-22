const todoRepository = require('../repository/todoRepository')

export const listTodos = async () => {
    try {
        const todos = await todoRepository.list()

        return todos
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getTodo = async (params) => {
    const { id } = params

    try {
        const todo = await todoRepository.get({ _id: id })

        return todo
    } catch (error) {
        throw new Error(error.message)
    }
}

export const createTodo = async (params) => {
    try {
        const todo = await todoRepository.create(params)

        return todo
    } catch (error) {
        throw new Error(error.message)
    }
}

export const updateTodo = async (params) => {
    const { id } = params

    try {
        const todo = await todoRepository.update(id, params)

        return todo
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getRandom = async () => {
    const url = 'https://www.boredapi.com/api/activity'

    try {
        const response = await fetch(url)
        const data = await response.json()

        return data
    } catch (error) {
        throw new Error(error.message)
    }
}

export const destroyTodo = async (params) => {
    const { id } = params

    try {
        const todo = await todoRepository.destroy(id)

        return todo
    } catch (error) {
        throw new Error(error.message)
    }
}

export const seedTodos = async () => {
    const data = [
        {
            title: 'firstTodo',
            description: 'some text',
            isDone: 'false',
            username: 'someUserName'
        }
    ]

    try {
        const todos = await todoRepository.insertMany(data)

        return todos
    } catch (error) {
        throw new Error(error.message)
    }
}
