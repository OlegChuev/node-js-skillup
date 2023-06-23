const todoRepository = require('../repository/todoRepository')

export const listTodos = async () => {
    const todos = await todoRepository.list()

    return todos
}

export const getTodo = async (params) => {
    const { id } = params

    const todo = await todoRepository.get({ _id: id })

    return todo
}

export const createTodo = async (params) => {
    const todo = await todoRepository.create(params)

    return todo
}

export const updateTodo = async (params) => {
    const { id } = params

    const todo = await todoRepository.update(id, params)

    return todo
}

export const getRandom = async () => {
    const url = 'https://www.boredapi.com/api/activity'

    const response = await fetch(url)
    const data = await response.json()

    const params = {
        description: data.activity,
        title: data.activity,
        username: 'current_user',
        isDone: false
    }

    const todo = await todoRepository.create(params)

    return todo
}

export const destroyTodo = async (params) => {
    const { id } = params
    const todo = await todoRepository.destroy(id)

    return todo
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
    const todos = await todoRepository.insertMany(data)

    return todos
}
