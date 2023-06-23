const todoRepository = require('../repository/todoRepository')

export const listTodos = async (userId) => {
    const todos = await todoRepository.list({ userIds: userId })

    return todos
}

export const getTodo = async (userId, params) => {
    const { id } = params

    const todo = await todoRepository.get({ _id: id, userIds: userId })

    return todo
}

export const createTodo = async (userId, params) => {
    const todo = await todoRepository.create({ ...params, userIds: userId })

    return todo
}

export const updateTodo = async (userId, params) => {
    const { id } = params

    const todo = await todoRepository.update(
        { userIds: userId, _id: id },
        params
    )

    return todo
}

export const createRandom = async (userId) => {
    const url = 'https://www.boredapi.com/api/activity'

    const response = await fetch(url)
    const data = await response.json()

    const params = {
        description: data.activity,
        title: data.activity,
        userIds: [userId],
        isDone: false
    }

    const todo = await todoRepository.create(params)

    return todo
}

export const destroyTodo = async (userId, params) => {
    const { id } = params
    const todo = await todoRepository.destroy({ id, userIds: userId })

    return todo
}

export const seedTodos = async (userId) => {
    const data = [
        {
            title: 'firstTodo',
            description: 'some text',
            isDone: 'false',
            userIds: userId
        }
    ]
    const todos = await todoRepository.insertMany(data)

    return todos
}

// export const shareById = async (currentUserId, params) => {
//     const { email, todoId } = params
// }
