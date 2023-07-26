import User from '../models/User'

export const create = async (params) => {
    return User.create({ data: params })
}

export const get = async (params) => {
    return User.findFirst({ where: params })
}

export const list = async () => {
    return User.findMany()
}
