const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true,
        default: false
    },
    userId: {
        type: String,
        required: true
    },
    sharedWith: {
        type: Array,
        required: false
    },
    isPrivate: {
        type: Boolean,
        required: true,
        default: true
    }
})

todoSchema.statics.userHaveAccess = function (userId) {
    // User can have access only to public todos of other users

    return this.where({
        $or: [
            // Private and belongs to user
            { $and: [{ userId }, { isPrivate: true }] },

            // Public and is belongs to user or is shared
            {
                $and: [
                    { isPrivate: false },
                    { $or: [{ userId }, { sharedWith: userId }] }
                ]
            }
        ]
    })
}

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
