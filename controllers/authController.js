import UserDAO from '../models/UserDAO'

const userDAO = new UserDAO()

export const signIn = (req, res) => {
    const { username, password } = req.body

    userDAO
        .signInUser(username, password)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch((error) => {
            res.status(401).json({ error: error.message })
        })
}

export const signUp = (req, res) => {
    const { username, password } = req.body

    userDAO
        .signUpUser(username, password)
        .then(() => {
            res.status(200).json({ success: 'Account created' })
        })
        .catch((error) => {
            res.status(401).json({ error: error.message })
        })
}
