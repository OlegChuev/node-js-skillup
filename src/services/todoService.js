import NotFoundError from '../errors/notFoundError'
import DefaultForbiddenError from '../errors/forbiddenError'
import wss from '../api/ws'

const todoRepository = require('../repository/todoRepository')
const userRepository = require('../repository/userRepository')

const { locationFormat } = require('../shared/todoHelper')

const { accessibleBy } = require('@casl/mongoose')
const { ForbiddenError } = require('@casl/ability')
const { lookUpRaw } = require("geojson-places");

const maxSharedUsersBeforeGoPublic = 3

export const listTodos = async (_user, ability) => {
    const todos = await todoRepository.list(accessibleBy(ability).Todo)

    return todos
}

export const getTodo = async (_user, ability, params) => {
    const { id } = params

    const todo = await todoRepository.get({
        $and: [
            accessibleBy(ability).Todo,
            { _id: id }
        ]
    })

    if (!todo) throw new NotFoundError("Todo doesn't exist or you don't have access to it.")

    return todo
}

export const createTodo = async (user, params) => {
    const location = params?.location?.coordinates
        ? locationFormat(params.location.coordinates)
        : {}

    const todo = await todoRepository.create({ ...params, userId: user.id , location })

    return todo
}

export const updateTodo = async (user, ability, params, body) => {
    const { id } = params

    const location = body?.location?.coordinates
        ? locationFormat(body.location.coordinates)
        : {}

    const todo = await todoRepository.get({
        $and: [
            accessibleBy(ability).Todo,
            { _id: id }
        ]
    })

    if (!todo) throw new NotFoundError("Todo doesn't exist or you don't have access to it.")

    todo.set({ ...body, location })

    ForbiddenError.from(ability).throwUnlessCan('update', todo)

    await todoRepository.save(todo)

    wss.broadcastToRoom(`todo-${todo.id}`, JSON.stringify({ event: 'todoUpdated', todo }))

    return todo
}

export const createRandom = async (user) => {
    const url = 'https://www.boredapi.com/api/activity'

    const response = await fetch(url)
    const data = await response.json()

    const params = {
        description: data.activity,
        title: data.activity,
        context: data.activity,
        userId: user.id,
        isDone: false
    }

    const todo = await todoRepository.create(params)

    wss.broadcastToUser(user.id, JSON.stringify({ event: 'todoCreated', todo }))

    return todo
}

export const destroyTodo = async (user, ability, params) => {
    const { id } = params
    const todo = await todoRepository.destroy({
        $and: [
            accessibleBy(ability, 'delete').Todo,
            { _id: id }
        ]
    })

    if (!todo) throw new NotFoundError("Todo doesn't exist or you don't have access to it.")

    wss.broadcastToRoom(`todo-${todo.id}`, JSON.stringify({ event: 'todoDestroyed', todo }))

    return todo
}

export const seedTodos = async (user) => {
    const data = [
        {
            title: 'firstTodo',
            description: 'some text',
            context: 'random',
            isDone: 'false',
            isPrivate: true,
            userId: user.id
        }
    ]

    const todos = await todoRepository.insertMany(data)

    return todos
}

export const giveAccessToUser = async (user, ability, params, body) => {
    const { id } = params
    const { email } = body

    const userToShare = await userRepository.get({ email })

    if (!userToShare) throw new NotFoundError(`User by email ${email} doesn't exist.`)

    if (userToShare.id === user.id) throw new DefaultForbiddenError('You cannot share todo with your account.')

    const todo = await todoRepository.get({
        $and: [
            accessibleBy(ability).Todo,
            { _id: id }
        ]
    })

    if (!todo) throw new NotFoundError("Todo doesn't exist or you don't have access to it.")

    todo.sharedWith.addToSet(userToShare.id)

    ForbiddenError.from(ability).throwUnlessCan('share', todo)

    const result = await todoRepository.save(todo)

    wss.broadcastToRoom(`todo-${todo.id}`, JSON.stringify({ event: 'todoShared', todo }))

    if (result.sharedWith.length >= maxSharedUsersBeforeGoPublic) {
        makeTodoPublic(todo)
        wss.broadcastToRoom(`todo-${todo.id}`, JSON.stringify({ event: 'todoSetToPublic', todo }))
    }

    return result
}

export const willGoPublic = async (_user, ability, params) => {
    const { id } = params

    const todo = await todoRepository.get({
        $and: [
            accessibleBy(ability).Todo,
            { _id: id }
        ]
    })

    if (!todo) throw new NotFoundError("Todo doesn't exist or you don't have access to it.")
    ForbiddenError.from(ability).throwUnlessCan('share', todo)

    const amountAfterSharing = todo.sharedWith.length + 1
    const willGoPublicAfterSharing = amountAfterSharing >= maxSharedUsersBeforeGoPublic

    return willGoPublicAfterSharing
}

export const changeOwnership = async (user, ability, params, body) => {
    const { id } = params
    const { email } = body

    const userToChange = await userRepository.get({ email })

    if (!userToChange) throw new NotFoundError(`User by email ${email} doesn't exist.`)

    if (userToChange.id === user.id) throw new DefaultForbiddenError('You cannot change ownership to your account.')

    const todo = await todoRepository.get({
        $and: [
            accessibleBy(ability).Todo,
            { _id: id }
        ]
    })

    if (!todo) throw new NotFoundError("Todo doesn't exist or you don't have access to it.")

    ForbiddenError.from(ability).throwUnlessCan('changeOwnership', todo)

    todo.set({ userId: userToChange.id })

    const result = await todoRepository.save(todo)

    wss.broadcastToRoom(`todo-${todo.id}`, JSON.stringify({ event: 'todoChangedOwnership', todo }))

    return result
}

export const searchByText = async (_user, ability, params) => {
    const searchBy = params.search_by

    const todos = await todoRepository.list({
        $and: [
            accessibleBy(ability).Todo,
            { $text: { $search: searchBy } }
        ]
    })

    return todos
}

export const searchInRadius = async (_user, ability, params) => {
    const METERS_PER_KILOMETER = 1000
    const { radius, coordinates } = params

    const searchInRadiusParams = locationFormat(coordinates)
    const searchCondition = {
        location: {
            $nearSphere: {
                $geometry: searchInRadiusParams,
                $maxDistance: radius * METERS_PER_KILOMETER
            }
        }
    }

    const todos = await todoRepository.list({
        $and: [
            accessibleBy(ability).Todo,
            searchCondition
        ]
    })

    return todos
}

export const checkCoordinates = async (_user, ability, params, body) => {
    const { id } = params
    const { userId } = body

    const targetTodo = await todoRepository.get({
        $and: [
            accessibleBy(ability).Todo,
            { _id: id }
        ]
    })

    if (!targetTodo) throw new NotFoundError("Todo doesn't exist or you don't have access to it.")

    const latestTodoByUser = await todoRepository.get({ userId }, { sort: { timestamp: -1} })

    if (!latestTodoByUser) return

    const currentTodoCoords = targetTodo.location.coordinates
    const currentTodoCoordsData = lookUpRaw(currentTodoCoords[1], currentTodoCoords[0])

    const latestTodoCoords = latestTodoByUser.location.coordinates
    const latestTodoCoordsData = lookUpRaw(latestTodoCoords[1], latestTodoCoords[0])

    const isTheSameCountry =
        latestTodoCoordsData.features[0].properties.geonunit === currentTodoCoordsData.features[0].properties.geonunit

    return isTheSameCountry
}

export const makeTodoPublic = async (todo) => {
    todo.isPrivate = false
    await todoRepository.save(todo)
}
