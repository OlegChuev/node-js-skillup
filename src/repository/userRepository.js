import User from '../models/User'

export const create = (params) => {
    const user = new User(params)

    return user.save()
}

export const get = (params) => {
    return User.findOne(params)
}

export const list = () => {
    return User.find()
}
