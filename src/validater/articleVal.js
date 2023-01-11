import Joi from 'joi';

//blog validation joi
const blogValidation = Joi.object({
    head: Joi.string().min(10).required(),
    image: Joi.string().required(),
    body: Joi.string().min(10).required()
})
//blog update validation joi
const blogUpdVal = Joi.object({
    head: Joi.string().min(10).required(),
    image: Joi.string().required(),
    body: Joi.string().min(10).required()
})

//comment validation joi
const commentVal = Joi.object({
    text: Joi.string().min(10).required()
})

export {blogValidation, blogUpdVal,commentVal}