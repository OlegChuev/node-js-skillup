// eslint-disable-next-line import/no-extraneous-dependencies
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import ApiError from './apiError'

class ForbiddenError extends ApiError {
    constructor(description) {
        super(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN, description)
    }
}

export default ForbiddenError
