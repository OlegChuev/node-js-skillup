import ApiError from './apiError'

class ForbiddenError extends ApiError {
    constructor(description) {
        super(403, 'Forbidden', description)
    }
}

export default ForbiddenError
