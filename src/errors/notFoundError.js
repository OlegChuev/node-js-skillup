import ApiError from './apiError'

class NotFoundError extends ApiError {
    constructor(description) {
        super(404, 'Not Found', description)
    }
}

export default NotFoundError
