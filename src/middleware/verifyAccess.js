// eslint-disable-next-line import/no-import-module-exports
import ForbiddenError from '../errors/forbiddenError'

const verifyAccess = (req, _res, next) => {
    const currentUser = req.user

    if (currentUser.is_blocked) {
        throw new ForbiddenError('Your account was blocked')
    }

    next()
}

module.exports = verifyAccess
