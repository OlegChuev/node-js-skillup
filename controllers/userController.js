import User from '../models/User'

// eslint-disable-next-line import/prefer-default-export
export const listUsers = (_req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}
