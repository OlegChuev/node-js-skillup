import { StatusCodes } from 'http-status-codes'

const userService = require('../services/userService')

export const list = async (req, res, next) => {
    try {
        const result = await userService.listAllUsers()

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const getProfile = async (req, res, next) => {
    try {
        const result = await userService.getProfile(req.user)

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}
