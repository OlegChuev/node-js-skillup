import mongoose from 'mongoose'
import ApiError from '../errors/apiError'

/* eslint-disable no-unused-vars */
const express = require('express')
const { isCelebrateError } = require('celebrate')

export const errorHandler = (error, req, res, next) => {
    res.header('Content-Type', 'application/json')

    res.status(error.statusCode).send(JSON.stringify(error.details()))
}

export const errorConverter = (err, _req, _res, next) => {
    let error = err
    let statusCode

    if (!(error instanceof ApiError)) {
        if (error instanceof mongoose.Error) statusCode = 400
        else if (isCelebrateError(error)) statusCode = 422
        else statusCode = 500

        const message = error.message || 'Unknown error'

        const description = isCelebrateError(error)
            ? error.details.get('body').message
            : message

        error = new ApiError(statusCode, message, description)
    }

    next(error)
}
