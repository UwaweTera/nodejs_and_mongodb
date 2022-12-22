import Joi from 'joi';

//blog validation joi
const blogValidation = Joi.object({
    header: Joi.string().min(10).required(),
    img: Joi.string().required(),
    content: Joi.string().min(10).required()
})
//blog update validation joi
const blogUpdVal = Joi.object({
    header: Joi.string().min(10).required(),
    img: Joi.string().required(),
    content: Joi.string().min(10).required()
})

//comment validation joi
const commentVal = Joi.object({
    text: Joi.string().min(10).required()
})

export {blogValidation, blogUpdVal,commentVal}