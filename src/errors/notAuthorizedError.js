// eslint-disable-next-line import/no-extraneous-dependencies
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import ApiError from './apiError'

class NotAuthorizedError extends ApiError {
    constructor(description) {
        super(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, description)
    }
}

export default NotAuthorizedError
