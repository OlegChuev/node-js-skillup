import Todo from '../models/Todo'
import CustomClass from '../services/custom_class'

const notifier = new CustomClass()

notifier.on('dbInteraction', (action) => {
    console.log(`Interaction with DB: ${action}`)
})

export const listTodo = (req, res) => {
    Todo.find()
        .then((todos) => {
            notifier.notifyAbout('list')
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

// Event loop test
export const getTodo = (req, res) => {
    Todo.findById(req.params.id)
        .then((todo) => {
            notifier.notifyAbout('get')

            process.nextTick(() => {
                console.log('nextTick') // 1
            })

            setImmediate(() => {
                console.log('setImmediate', todo) // 2
            })

            setTimeout(() => {
                console.log('setTimeout', todo) // 3
                res.status(200).json(todo)
            })

            process.nextTick(() => {
                console.log('nextTick', todo) // 1
            })
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}

export const destroyTodo = (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then((todo) => {
            notifier.notifyAbout('destroy')
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
            notifier.notifyAbout('post')
            res.status(200).json(newTodo)
        })
        .catch((error) => {
            res.status(409).json({ error: error.message })
        })
}

export const updateTodo = (req, res) => {
    Todo.findByIdAndUpdate(req.body.id, req.body)
        .then((todo) => {
            notifier.notifyAbout('update')
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
            res.status(123).json({ error: error.message })
        })
}
