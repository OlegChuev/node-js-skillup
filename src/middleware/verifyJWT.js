const jwtHelper = require('../shared/jwtHelper/index')

import NotAuthorizedError from '../errors/notAuthorizedError'
import ForbiddenError from '../errors/forbiddenError'

const userRepository = require('../repository/userRepository')

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer '))
        throw new NotAuthorizedError('Missed JWT token.')

    const token = authHeader.split(' ')[1]

    jwtHelper.verifyAccessToken(token, async (err, decoded) => {
        if (err)
            throw new ForbiddenError('Invalid or expired JWT token.')

        req.user = await userRepository.get({ id: decoded.id })

        next()
    }).catch((error) => next(error))
}

module.exports = verifyJWT