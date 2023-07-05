const jwtHelper = require('../shared/jwtHelper/index')

import NotAuthorizedError from '../errors/notAuthorizedError'
import ForbiddenError from '../errors/forbiddenError'

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    debugger
    if (!authHeader?.startsWith('Bearer '))
        throw new NotAuthorizedError('Missed JWT token.')

    const token = authHeader.split(' ')[1]

    jwtHelper.verifyAccessToken(token, (err, decoded) => {
        if (err)
            throw new ForbiddenError('Invalid or expired JWT token.')

        req.user = decoded.user
        next()
  })
}

module.exports = verifyJWT