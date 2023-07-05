import NotFoundError from '../errors/notFoundError'
import ForbiddenError from '../errors/forbiddenError'

const todoRepository = require('../repository/todoRepository')
const userRepository = require('../repository/userRepository')

export const listTodos = async (userId) => {
    const todos = await todoRepository.list({
        $or: [{ userId }, { sharedWith: { $in: [userId] } }]
    })

    return todos
}

export const getTodo = async (userId, params) => {
    const { id } = params

    const todo = await todoRepository.get({
        _id: id,
        $or: [{ userId }, { sharedWith: { $in: [userId] } }]
    })

    if (!todo)
        throw new NotFoundError(
            "Todo doesn't exist or you don't have access to it"
        )

    return todo
}

export const createTodo = async (userId, params) => {
    const todo = await todoRepository.create({ ...params, userId })

    return todo
}

export const updateTodo = async (userId, params) => {
    const { id } = params

    const todo = await todoRepository.update(
        { _id: id, $or: [{ userId }, { sharedWith: { $in: [userId] } }] },
        params
    )

    if (!todo)
        throw new NotFoundError(
            "Todo doesn't exist or you don't have access to it"
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
        userId,
        isDone: false
    }

    const todo = await todoRepository.create(params)

    return todo
}

export const destroyTodo = async (userId, params) => {
    const { id } = params
    const todo = await todoRepository.destroy({
        _id: id,
        $or: [{ userId }, { sharedWith: { $in: [userId] } }]
    })

    if (!todo)
        throw new NotFoundError(
            "Todo doesn't exist or you don't have access to it"
        )

    return todo
}

export const seedTodos = async (userId) => {
    const data = [
        {
            title: 'firstTodo',
            description: 'some text',
            isDone: 'false',
            userId
        }
    ]
    const todos = await todoRepository.insertMany(data)

    return todos
}

export const giveAccessToUser = async (userId, params, body) => {
    const { id } = params
    const { email } = body

    const user = await userRepository.get({ email })
    if (!user) throw new NotFoundError(`User by email ${email} doesn't exist.`)

    if (user._id == userId)
        throw new ForbiddenError('You cannot share todo with your account')

    const todo = await todoRepository.update(
        { _id: id, $or: [{ userId }, { sharedWith: { $in: [userId] } }] },
        { $addToSet: { sharedWith: user.id } }
    )

    return todo
}
