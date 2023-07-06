// eslint-disable-next-line import/no-extraneous-dependencies
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import ApiError from './apiError'

class NotFoundError extends ApiError {
    constructor(description) {
        super(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, description)
    }
}

export default NotFoundError
