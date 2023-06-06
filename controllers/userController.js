import User from '../models/User'

export const listUsers = (req, res) => {
    User.find()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}
