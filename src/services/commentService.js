import wss from '../api/ws'

const commentRepository = require('../repository/commentRepository')

export const listAllComments = async (params) => {
    const { id } = params

    const comments = await commentRepository.list(id)

    return comments
}
export const createComment = async (user, params) => {
    const { todoId, text } = params

    const comment = await commentRepository.create(todoId, user.id, text)

    wss.broadcastToUser(
        user.id,
        JSON.stringify({ event: 'commentCreated', comment })
    )

    return comment
}
