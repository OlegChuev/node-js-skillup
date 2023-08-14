// eslint-disable-next-line import/no-extraneous-dependencies
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import ApiError from './apiError'

class PaymentRequiredError extends ApiError {
    constructor(description) {
        super(
            StatusCodes.PAYMENT_REQUIRED,
            ReasonPhrases.PAYMENT_REQUIRED,
            description
        )
    }
}

export default PaymentRequiredError
