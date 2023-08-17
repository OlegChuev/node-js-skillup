const jwtHelper = require('../shared/jwtHelper/index')

import NotAuthorizedError from '../errors/notAuthorizedError'
import ForbiddenError from '../errors/forbiddenError'

const userRepository = require('../repository/userRepository')

const verifyJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer '))
        throw new NotAuthorizedError('Missed JWT token.')

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwtHelper.verifyAccessToken(token)
        req.user = await userRepository.get({ id: decoded.id })

        next()
    } catch(err) {
        throw new ForbiddenError('Invalid or expired JWT token.')
    }
}

module.exports = verifyJWT