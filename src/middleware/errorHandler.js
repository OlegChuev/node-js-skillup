// eslint-disable-next-line import/no-extraneous-dependencies
import { StatusCodes } from 'http-status-codes'
import mongoose from 'mongoose'
import { Prisma } from '@prisma/client'
import { ForbiddenError } from '@casl/ability'
import ApiError from '../errors/apiError'
import { handlePrismaError } from './prismaErrorHandler'

const { isCelebrateError } = require('celebrate')

export const errorHandler = (error, req, res, _next) => {
    res.header('Content-Type', 'application/json')

    res.status(error.statusCode).send(JSON.stringify(error.details()))
}

export const errorConverter = (err, _req, _res, next) => {
    if (err instanceof ApiError) {
        next(err)
        return
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        next(handlePrismaError(err))
        return
    }

    let statusCode

    // Mongoose errors
    if (err instanceof mongoose.Error) statusCode = StatusCodes.BAD_REQUEST
    // JWT errors
    else if (err instanceof ForbiddenError) statusCode = StatusCodes.FORBIDDEN
    // Celebrate validation errors
    else if (isCelebrateError(err))
        statusCode = StatusCodes.UNPROCESSABLE_ENTITY
    // Other errors
    else statusCode = StatusCodes.INTERNAL_SERVER_ERROR

    const message = err.message || 'Unknown error'

    const description = isCelebrateError(err)
        ? err.details.get('body').message
        : message

    const error = new ApiError(statusCode, message, description)

    next(error)
}
