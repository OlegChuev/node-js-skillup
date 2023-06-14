import User from '../models/User'

const bcrypt = require('bcryptjs')

const jwt = require('../modules/jwt/index')

export const signIn = (req, res) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            bcrypt.compare(req.body.password, user?.password || '').then((compareRes) => {
              if (compareRes) {
                res.status(200).json({ success: jwt.AUTHENTICATED, access_token: jwt.generateAccessToken({user: user}) })
              }
              else {
                res.status(401).json({ error: jwt.UNAUTHENTICATED })
              }
            }).catch((error) => {
              res.status(404).json({ error: error.message })
            })
        })
        .catch((error) => {
            res.status(404).json({ error: error.message })
        })
}

export const signUp = (req, res) => {
    const saltRounds = 10

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            const newUser = new User({
                password: hash,
                username: req.body.username
            })

            newUser
                .save()
                .then(() => {
                    res.status(200).json({ success: 'Account created' })
                })
                .catch((error) => {
                    res.status(404).json({ error: error.message })
                })
        })
    })
}
