import Comment from '../models/Comment'

export const create = async (todoId, userId, text) => {
    return Comment.create({
        data: {
            todo_id: todoId,
            user_id: userId,
            text
        }
    })
}

export const list = async (todoId) => {
    return Comment.findMany({ where: { todo_id: todoId } })
}
