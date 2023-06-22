const todoService = require('../services/todoService')

export const list = (req, res) => {
    try {
        const result = todoService.listTodos()

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const getRandom = async (req, res) => {
    try {
        const result = await todoService.getRandom()

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const get = async (req, res) => {
    try {
        const result = await todoService.getTodo(req.params)

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const destroy = async (req, res) => {
    try {
        const result = todoService.createTodo(req.body)

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const post = async (req, res) => {
    try {
        const result = todoService.createTodo(req.body)

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const result = await todoService.updateTodo(req.body)

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const seed = (req, res) => {
    try {
        todoService.seedTodos()

        res.status(200).json({ status: 'done' })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
