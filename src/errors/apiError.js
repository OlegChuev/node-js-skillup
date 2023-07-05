class ApiError extends Error {
    constructor(statusCode, message, description) {
        super()

        this.statusCode = statusCode
        this.message = message
        this.description = description || message
    }

    details() {
        return {
            message: this.message,
            description: this.description
        }
    }
}

export default ApiError
