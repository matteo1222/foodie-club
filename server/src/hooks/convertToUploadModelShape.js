const convertToUploadModelShape = (context) => {
    context.data = {
        name: context.params.file.originalname,
        // remove public/
        path: context.params.file.path.split('/').slice(1).join('/'),
        user_id: context.params.query.user_id,
        id: context.params.query.user_id
    }
    context.params.query = {}
    return context
}

module.exports = convertToUploadModelShape

