import { StatusCodes } from 'http-status-codes'
import ApiError from '../errors/apiError'

// https://www.prisma.io/docs/reference/api-reference/error-reference#common

// eslint-disable-next-line import/prefer-default-export
export const handlePrismaError = (err) => {
    switch (err.code) {
        case 'P2002':
            // handling duplicate key errors
            return new ApiError(
                StatusCodes.BAD_REQUEST,
                `Duplicate field value: ${err.meta.target}`
            )
        case 'P2014':
            // handling invalid id errors
            return new ApiError(
                StatusCodes.BAD_REQUEST,
                `Invalid ID: ${err.meta.target}`
            )
        case 'P2003':
            // handling invalid data errors
            return new ApiError(
                StatusCodes.BAD_REQUEST,
                `Invalid input data: ${err.meta.target}`
            )
        default:
            // handling all other errors
            return new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                `Something went wrong: ${err.message}`
            )
    }
}
