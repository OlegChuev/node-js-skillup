import Todo from '../models/Todo'

export const listTodo = (req, res) => {
    Todo.find()
        .then((todos) => {
            res.status(200).json(todos)
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}

export const getRandomTodo = (req, res) => {
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

export const getTodo = (req, res) => {
    Todo.findById(req.params.id)
        .then((todo) => {
            res.status(200).json(todo)
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}

export const destroyTodo = (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then((todo) => {
            res.status(200).json({ result: todo })
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}

export const postTodo = (req, res) => {
    const newTodo = new Todo(req.body)

    newTodo
        .save()
        .then(() => {
            res.status(200).json(newTodo)
        })
        .catch((error) => {
            res.status(409).json({ error: error.message })
        })
}

export const updateTodo = (req, res) => {
    Todo.findByIdAndUpdate(req.body.id, req.body)
        .then((todo) => {
            res.status(200).json({ result: todo })
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}

export const seedTodos = (req, res) => {
    const starterTodos = [
        {
            title: 'firstTodo',
            description: 'some text',
            isDone: 'false',
            username: 'someUserName'
        }
    ]

    Todo.insertMany(starterTodos)
        .then(() => res.status(200).json({ status: 'done' }))
        .catch((error) => {
            res.status(500).json({ error: error.message })
        })
}
