/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-import-module-exports
import Todo from './Todo'

class TodoDAO {
    listTodos() {
        return Todo.find()
    }

    createTodo(data) {
        const newTodo = new Todo(data)
        return newTodo.save()
    }

    findTodoByIdAndUpdate(id, data) {
        return Todo.findByIdAndUpdate(id, data)
    }

    deleteTodoById(id) {
        return Todo.findByIdAndDelete(id)
    }

    getTodoById(id) {
        return Todo.findById(id)
    }

    seedTodos() {
        // not sure that if it should be here ¯\_(ツ)_/¯

        const data = [
            {
                title: 'firstTodo',
                description: 'some text',
                isDone: 'false',
                username: 'someUserName'
            }
        ]

        return Todo.insertMany(data)
    }
}

module.exports = TodoDAO
