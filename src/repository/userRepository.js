import User from '../models/User'

export const create = async (params) => {
    const user = new User(params)

    return user.save()
}

export const get = async (params) => {
    return User.findOne(params)
}

export const list = async () => {
    return User.find()
}
