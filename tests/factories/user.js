/* eslint-disable import/no-import-module-exports */
import { faker } from '@faker-js/faker'
import User from '../../src/models/User'

const bcrypt = require('bcryptjs')

class UserFactory {
    constructor({
        username,
        password,
        email,
        is_blocked,
        country,
        postal_code
    } = {}) {
        this.username = username || faker.internet.userName()
        this.password = password || faker.internet.password()
        this.email = email || faker.internet.email()
        this.is_blocked = is_blocked || false
        this.country = country || faker.location.country()
        this.postal_code = postal_code || faker.location.zipCode()
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
                is_blocked: this.is_blocked,
                country: this.country,
                postal_code: this.postal_code
            }
        })

        return user
    }
}

module.exports = UserFactory
