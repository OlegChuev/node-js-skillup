import TodoDAO from '../models/TodoDAO'

const todoDAO = new TodoDAO()

export const list = (req, res) => {
    todoDAO
        .listTodos()
        .then((todos) => {
            res.status(200).json(todos)
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}

export const getRandom = (req, res) => {
    const url = 'https://www.boredapi.com/api/activity'

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            res.status(200).json({ todo: data.activity })
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}

export const get = (req, res) => {
    todoDAO
        .getTodoById(req.params.id)
        .then((todo) => {
            res.status(200).json(todo)
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}

export const destroy = (req, res) => {
    todoDAO
        .deleteTodoById(req.params.id)
        .then((todo) => {
            res.status(200).json(todo)
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}

export const post = (req, res) => {
    todoDAO
        .createTodo(req.body)
        .then((todo) => {
            res.status(200).json(todo)
        })
        .catch((error) => {
            res.status(409).json({ error: error.message })
        })
}

export const update = (req, res) => {
    todoDAO
        .findTodoByIdAndUpdate(req.body.id, req.body)
        .then((todo) => {
            res.status(200).json(todo)
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}

export const seed = (req, res) => {
    todoDAO
        .seedTodos()
        .then(() => res.status(200).json({ status: 'done' }))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
}
