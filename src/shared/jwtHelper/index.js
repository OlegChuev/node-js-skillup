const jwt = require('jsonwebtoken')

export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '8h' })
}

export const verifyAccessToken = (token, callback) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, callback)
}

