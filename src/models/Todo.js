const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    context: {
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
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], // Only 'Point' type is allowed
            required: true,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true,
            // [longitude, latitude]
            // the longitude must be a number between -180 and 180.
            // the latitude must be a number between -90 and 90.
            default: [0, 0]
        }
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

todoSchema.index({ title: 'text', context: 'text' })
todoSchema.index({ location: '2dsphere' })

const Todo = mongoose.model('Todo', todoSchema)

export default Todo
