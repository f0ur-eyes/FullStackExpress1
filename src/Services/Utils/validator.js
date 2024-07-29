// require joi
const joi= require("joi")

// a function to take a schema and check for validity
const validator = schema => (req, res, next) =>{
    // validate and receive error
    const {error} = schema.validate(req.body, {abortEarly: false})
    // if error and is not null
    if(error){
        // make message and fill it with the errors
        var message="";
        for(let key in error.details){
            var detail = error.details[key]
            message+= detail.message + "\n";
        }
        // return status 400 and message
        return res.status(400).json({
            message:message
        })
    }
    // if error was null, continue to the next function from where this function was called
    next();
}

// a schema for a todo item
const todoSchema = joi.object({
    // needs a title and description
    title:joi.string().min(1).max(12).required(),
    description:joi.string().required()
})

// export the necessary syntax
module.exports = {
    validateTodo: validator(todoSchema)
}