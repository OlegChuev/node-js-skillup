const todoService = require('../services/todoService')

export const list = async (req, res, next) => {
    try {
        const result = await todoService.listTodos(req.user, req.ability)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const createRandom = async (req, res, next) => {
    try {
        const result = await todoService.createRandom(req.user)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const get = async (req, res, next) => {
    try {
        const result = await todoService.getTodo(
            req.user,
            req.ability,
            req.params
        )

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const destroy = async (req, res, next) => {
    try {
        const result = await todoService.destroyTodo(
            req.user,
            req.ability,
            req.params
        )

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const post = async (req, res, next) => {
    try {
        const result = await todoService.createTodo(req.user, req.body)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const update = async (req, res, next) => {
    try {
        const result = await todoService.updateTodo(
            req.user,
            req.ability,
            req.body
        )

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const seed = async (req, res, next) => {
    try {
        const result = await todoService.seedTodos(req.user)

        res.status(200).json({ status: 'done', result })
    } catch (error) {
        next(error)
    }
}

export const share = async (req, res, next) => {
    try {
        const result = await todoService.giveAccessToUser(
            req.user,
            req.ability,
            req.params,
            req.body
        )

        res.status(200).json({ status: 'done', result })
    } catch (error) {
        next(error)
    }
}

export const changeOwnership = async (req, res, next) => {
    try {
        const result = await todoService.changeOwnership(
            req.user,
            req.ability,
            req.params,
            req.body
        )

        res.status(200).json({ status: 'done', result })
    } catch (error) {
        next(error)
    }
}

export const searchByText = async (req, res, next) => {
    try {
        const result = await todoService.searchByText(
            req.user,
            req.ability,
            req.body
        )

        res.status(200).json({ result })
    } catch (error) {
        next(error)
    }
}

export const searchInRadius = async (req, res, next) => {
    try {
        const result = await todoService.searchInRadius(
            req.user,
            req.ability,
            req.body
        )

        res.status(200).json({ result })
    } catch (error) {
        next(error)
    }
}
