import Todo from '../models/todo_model'
import CustomClass from '../../../services/custom_class'

const notifier = new CustomClass()

notifier.on('dbInteraction', (action) => {
    console.log(`Interaction with DB: ${action}`)
})

export const listTodo = async (req, res) => {
    try {
        await Todo.find().then((todos) => {
            notifier.notifyAbout('list')
            res.status(200).json(todos)
        })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const getTodo = async (req, res) => {
    try {
        await Todo.findById(req.params.id).then((todo) => {
            notifier.notifyAbout('get')

            setTimeout(function () {
                debugger
                res.status(200).json(todo)
            }, 100)
        })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const destroyTodo = async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id).then((todo) => {
            notifier.notifyAbout('destroy')
            res.status(200).json({ result: todo })
        })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}

export const postTodo = async (req, res) => {
    const newTodo = new Todo(req.body)

    try {
        await newTodo.save().then(() => {
            notifier.notifyAbout('post')
            res.status(200).json(newTodo)
        })
    } catch (error) {
        res.status(409).json({ error: error.message })
    }
}

export const updateTodo = async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.body.id, req.body).then((todo) => {
            notifier.notifyAbout('update')
            res.status(200).json({ result: todo })
        })
    } catch (error) {
        res.status(404).json({ error: error.message })
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
