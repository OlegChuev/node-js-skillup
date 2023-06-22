const userRepository = require('../services/userService')

// eslint-disable-next-line import/prefer-default-export
export const list = async (req, res) => {
    try {
        const result = await userRepository.listAllUsers()

        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
}
