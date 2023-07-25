const todoService = require('../services/todoService')

export const list = async (req, res, next) => {
    try {
        const result = await todoService.listTodos(req.user.id)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const createRandom = async (req, res, next) => {
    try {
        const result = await todoService.createRandom(req.user.id)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const get = async (req, res, next) => {
    try {
        const result = await todoService.getTodo(req.user.id, req.params)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const destroy = async (req, res, next) => {
    try {
        const result = await todoService.destroyTodo(req.user.id, req.params)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const post = async (req, res, next) => {
    try {
        const result = await todoService.createTodo(req.user.id, req.body)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const update = async (req, res, next) => {
    try {
        const result = await todoService.updateTodo(req.user.id, req.body)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const seed = async (req, res, next) => {
    try {
        await todoService.seedTodos(req.user.id)

        res.status(200).json({ status: 'done' })
    } catch (error) {
        next(error)
    }
}

export const share = async (req, res, next) => {
    try {
        const result = await todoService.giveAccessToUser(
            req.user.id,
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
            req.user.id,
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
        const result = await todoService.searchByText(req.user.id, req.body)

        res.status(200).json({ result })
    } catch (error) {
        next(error)
    }
}

export const searchInRadius = async (req, res, next) => {
    try {
        const result = await todoService.searchInRadius(req.user.id, req.body)

        res.status(200).json({ result })
    } catch (error) {
        next(error)
    }
}
