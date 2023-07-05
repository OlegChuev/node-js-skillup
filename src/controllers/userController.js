const userRepository = require('../services/userService')

// eslint-disable-next-line import/prefer-default-export
export const list = async (req, res, next) => {
    try {
        const result = await userRepository.listAllUsers()

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}
