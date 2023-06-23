const bcrypt = require('bcryptjs')
const jwt = require('../shared/jwtHelper/index')
const userRepository = require('../repository/userRepository')

export const listAllUsers = async () => {
    const users = await userRepository.list()

    return users
}

export const signUpUser = async (params) => {
    const { username, password } = params

    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await userRepository.create({
        username,
        password: hash
    })

    return newUser
}

export const signInUser = async (params) => {
    const { username, password } = params

    const user = await userRepository.get({ username })

    if (!user) throw new Error(jwt.UNAUTHENTICATED)

    const compareResult = bcrypt.compareSync(password, user.password)

    if (!compareResult) throw new Error(jwt.UNAUTHENTICATED)

    return {
        success: jwt.AUTHENTICATED,
        access_token: jwt.generateAccessToken({ user })
    }
}
