import NotAuthorizedError from '../errors/notAuthorizedError'

const bcrypt = require('bcryptjs')
const jwt = require('../shared/jwtHelper/index')
const userRepository = require('../repository/userRepository')

export const listAllUsers = async () => {
    const users = await userRepository.list()

    return users
}

export const signUpUser = async (params) => {
    const { username, password, email } = params

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await userRepository.create({
        username,
        password: hash,
        email
    })

    return newUser
}

export const signInUser = async (params) => {
    const { username, password } = params

    const user = await userRepository.get({ username })

    if (!user) throw new NotAuthorizedError('Username or password is incorrect')

    const compareResult = bcrypt.compareSync(password, user.password)

    if (!compareResult)
        throw new NotAuthorizedError('Username or password is incorrect')

    return {
        success: 'Authenticated',
        access_token: jwt.generateAccessToken({ user })
    }
}
