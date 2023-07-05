import ApiError from './apiError'

class NotAuthorizedError extends ApiError {
    constructor(description) {
        super(401, 'Unauthenticated', description)
    }
}

export default NotAuthorizedError
