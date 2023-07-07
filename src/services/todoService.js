import NotFoundError from '../errors/notFoundError'
import ForbiddenError from '../errors/forbiddenError'

const todoRepository = require('../repository/todoRepository')
const userRepository = require('../repository/userRepository')

export const listTodos = async (userId) => {
    const todos = await todoRepository.list(userId)

    return todos
}

export const getTodo = async (userId, params) => {
    const { id } = params

    const todo = await todoRepository.get(userId, { _id: id })

    if (!todo)
        throw new NotFoundError(
            "Todo doesn't exist or you don't have access to it."
        )

    return todo
}

export const createTodo = async (userId, params) => {
    const todo = await todoRepository.create({ ...params, userId })

    return todo
}

export const updateTodo = async (userId, params) => {
    const { id } = params

    const todo = await todoRepository.update(userId, { _id: id }, params)

    if (!todo)
        throw new NotFoundError(
            "Todo doesn't exist or you don't have access to it."
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
    const todo = await todoRepository.destroy(userId, { _id: id })

    if (!todo)
        throw new NotFoundError(
            "Todo doesn't exist or you don't have access to it."
        )

    return todo
}

export const seedTodos = async (userId) => {
    const data = [
        {
            title: 'firstTodo',
            description: 'some text',
            isDone: 'false',
            isPrivate: true,
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

    if (user.id === userId)
        throw new ForbiddenError('You cannot share todo with your account.')

    const todo = await todoRepository.get(userId, { _id: id })

    if (!todo)
        throw new NotFoundError(
            "Todo doesn't exist or you don't have access to it."
        )

    if (todo.isPrivate)
        throw new ForbiddenError(
            'You cannot share private todo. Set isPrivate to false firstly.'
        )

    if (todo.userId !== userId)
        throw new ForbiddenError('You can only share your own todo.')

    const result = await todoRepository.update(
        userId,
        { _id: id },
        { $addToSet: { sharedWith: user.id } }
    )

    return result
}

export const changeOwnership = async (userId, params, body) => {
    const { id } = params
    const { email } = body

    const user = await userRepository.get({ email })
    if (!user) throw new NotFoundError(`User by email ${email} doesn't exist.`)

    if (user.id === userId)
        throw new ForbiddenError('You cannot change ownership to your account.')

    const todo = await todoRepository.get(userId, { _id: id })

    if (!todo)
        throw new NotFoundError(
            "Todo doesn't exist or you don't have access to it."
        )

    if (todo.isPrivate)
        throw new ForbiddenError(
            'You cannot change ownership of private todo. Set isPrivate to false firstly.'
        )

    if (todo.userId !== userId)
        throw new ForbiddenError(
            'You can change the ownership of only your own todo.'
        )

    const result = await todoRepository.update(
        userId,
        { _id: id },
        { userId: user.id }
    )

    return result
}
