/* eslint-disable import/no-import-module-exports */
import { faker } from '@faker-js/faker'
import Todo from '../../src/models/Todo'

class TodoFactory {
    constructor({ title, description, isDone, userId, sharedWith } = {}) {
        this.title = title || faker.location.city()
        this.description = description || faker.location.city()
        this.isDone = isDone || false
        this.userId = userId || faker.number.int(100)
        this.sharedWith = sharedWith || []
    }

    async save() {
        const newTodo = new Todo({
            title: this.title,
            description: this.description,
            isDone: this.isDone,
            userId: this.userId,
            sharedWith: this.sharedWith
        })

        const savedTodo = await newTodo.save()

        return savedTodo
    }
}

module.exports = TodoFactory
