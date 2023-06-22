const userService = require('../services/userService')

export const signIn = async (req, res) => {
    try {
        const result = await userService.signInUser(req.body)

        res.status(200).json(result)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}

export const signUp = async (req, res) => {
    try {
        await userService.signUpUser(req.body)

        res.status(200).json({ success: 'Account created' })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
}
