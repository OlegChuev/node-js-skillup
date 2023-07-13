/* eslint-disable import/no-import-module-exports */
import { faker } from '@faker-js/faker'
import Todo from '../../src/models/Todo'

class TodoFactory {
    constructor({
        title,
        description,
        context,
        isDone,
        userId,
        sharedWith,
        isPrivate,
        coordinates
    } = {}) {
        this.title = title || faker.location.city()
        this.description = description || faker.location.city()
        this.context = context || faker.location.city()
        this.isDone = isDone || false
        this.userId = userId || faker.number.int(100)
        this.sharedWith = sharedWith || []
        this.isPrivate = isPrivate || false
        this.location = {
            type: 'Point',
            coordinates: coordinates || [0, 0]
        }
    }

    async save() {
        const newTodo = new Todo({
            title: this.title,
            description: this.description,
            isDone: this.isDone,
            userId: this.userId,
            sharedWith: this.sharedWith,
            isPrivate: this.isPrivate,
            context: this.context,
            location: this.location
        })

        const savedTodo = await newTodo.save()

        return savedTodo
    }
}

module.exports = TodoFactory
