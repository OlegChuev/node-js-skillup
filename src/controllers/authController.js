const userService = require('../services/userService')

export const signIn = async (req, res, next) => {
    try {
        const result = await userService.signInUser(req.body)

        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

export const signUp = async (req, res, next) => {
    try {
        await userService.signUpUser(req.body)

        res.status(200).json({ success: 'Account created' })
    } catch (error) {
        next(error)
    }
}
