// eslint-disable-next-line import/prefer-default-export
export const clearModelCollection = async (model) => {
    const collectionIsMissedErrorCode = 26

    try {
        await model.deleteMany({})
    } catch (error) {
        if (error.code !== collectionIsMissedErrorCode) {
            throw error
        }
    }
}
