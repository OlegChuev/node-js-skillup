import { StatusCodes } from 'http-status-codes'

const commentService = require('../services/commentService')

export const createComment = async (req, res, next) => {
    try {
        const result = await commentService.createComment(req.user, req.body)

        res.status(StatusCodes.OK).json({ result })
    } catch (error) {
        next(error)
    }
}

export const listComments = async (req, res, next) => {
    try {
        const result = await commentService.listAllComments(req.params)

        res.status(StatusCodes.OK).json({ result })
    } catch (error) {
        next(error)
    }
}
