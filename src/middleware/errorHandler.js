// eslint-disable-next-line import/no-extraneous-dependencies
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import ApiError from '../errors/apiError'

const { isCelebrateError } = require('celebrate')

export const errorHandler = (error, req, res, _next) => {
    res.header('Content-Type', 'application/json')

    res.status(error.statusCode).send(JSON.stringify(error.details()))
}

export const errorConverter = (err, _req, _res, next) => {
    let error = err
    let statusCode

    if (!(error instanceof ApiError)) {
        if (error instanceof mongoose.Error)
            statusCode = StatusCodes.BAD_REQUEST
        else if (isCelebrateError(error))
            statusCode = StatusCodes.UNPROCESSABLE_ENTITY
        else statusCode = StatusCodes.INTERNAL_SERVER_ERROR

        const message = error.message || 'Unknown error'

        const description = isCelebrateError(error)
            ? error.details.get('body').message
            : message

        error = new ApiError(statusCode, message, description)
    }

    next(error)
}
