/* eslint-disable class-methods-use-this */
// eslint-disable-next-line import/no-import-module-exports
import User from './User'

const bcrypt = require('bcryptjs')

const jwt = require('../shared/jwtHelper/index')

class UserDAO {
    listUsers() {
        return User.find()
    }

    async signUpUser(username, password) {
        try {
            const saltRounds = 10
            const salt = await bcrypt.genSalt(saltRounds)
            const hash = await bcrypt.hash(password, salt)

            const newUser = new User({
                password: hash,
                username
            })

            return await newUser.save()
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async signInUser(username, password) {
        try {
            const user = await User.findOne({ username })

            if (!user) throw new Error(jwt.UNAUTHENTICATED)

            const compareResult = bcrypt.compareSync(password, user.password)

            if (!compareResult) throw new Error(jwt.UNAUTHENTICATED)

            return {
                success: jwt.AUTHENTICATED,
                access_token: jwt.generateAccessToken({ user })
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

module.exports = UserDAO
