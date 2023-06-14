// eslint-disable-next-line import/prefer-default-export
export const clearModelCollection = async (model) => {
    await model.deleteMany({})
}
