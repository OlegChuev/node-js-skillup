import UserDAO from '../models/UserDAO'

const userDAO = new UserDAO()

// eslint-disable-next-line import/prefer-default-export
export const listUsers = (_req, res) => {
    userDAO
        .listUsers()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}
