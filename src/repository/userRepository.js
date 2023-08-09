import User from '../models/User'

export const create = async (params) => {
    return User.create({ data: params })
}

export const get = async (params, selectFields) => {
    return User.findFirst({ where: params, select: selectFields })
}

export const list = async (params, selectFields) => {
    return User.findMany({ where: params, select: selectFields })
}

export const update = async (filter, params) => {
    return User.update({
        where: filter,
        data: params
    })
}
