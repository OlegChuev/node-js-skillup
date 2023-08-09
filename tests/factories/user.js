/* eslint-disable import/no-import-module-exports */
import { faker } from '@faker-js/faker'
import User from '../../src/models/User'

const bcrypt = require('bcryptjs')

class UserFactory {
    constructor({ username, password, email, is_blocked } = {}) {
        this.username = username || faker.internet.userName()
        this.password = password || faker.internet.password()
        this.email = email || faker.internet.email()
        this.is_blocked = is_blocked || false
    }

    getPassword() {
        return this.password
    }

    async getPasswordHash() {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(this.getPassword(), salt)

        return hash
    }

    async save() {
        const user = User.create({
            data: {
                username: this.username,
                email: this.email,
                password: await this.getPasswordHash(),
                is_blocked: this.is_blocked
            }
        })

        return user
    }
}

module.exports = UserFactory
