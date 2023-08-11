/* eslint-disable import/no-import-module-exports */
import { faker } from '@faker-js/faker'
import Comment from '../../src/models/Comment'

class CommentFactory {
    constructor({ userId, todoId, text } = {}) {
        this.user_id = userId || faker.number.int({ max: 100 })
        this.todo_id = todoId || faker.phone.imei()
        this.text = text || faker.animal.bear()
    }

    async save() {
        const comment = Comment.create({
            data: {
                user_id: this.user_id,
                todo_id: this.todo_id,
                text: this.text
            }
        })

        return comment
    }
}

module.exports = CommentFactory
