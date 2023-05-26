import Todo from '../models/todo_model'

export const getTodo = async (req, res) => {
    try {
        await Todo.find().then((tests) => {
            res.status(200).json(tests)
        })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const destroyTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id).then(() => {
            res.status(200).json({ result: 'deleted' })
        })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const postTodo = async (req, res) => {
    const newTodo = new Todo(req.body)

    try {
        await newTodo.save().then(() => {
            res.status(200).json(newTodo)
        })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const seedTodos = async (req, res) => {
    const starterTodos = [
        {
            title: 'firstTodo',
            description: 'some text',
            isDone: 'false',
            username: 'someUserName'
        }
    ]

    try {
        await Todo.insertMany(starterTodos).then(() =>
            res.status(200).json({ status: 'done' })
        )
    } catch (error) {
        res.status(123).json({ error: error.message })
    }
}
