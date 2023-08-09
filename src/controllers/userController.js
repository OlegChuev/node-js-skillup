const userService = require('../services/userService')

export const list = async (req, res, next) => {
    try {
        const result = await userService.listAllUsers()

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const getProfile = async (req, res, next) => {
    try {
        const result = await userService.getProfile(req.user)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}
