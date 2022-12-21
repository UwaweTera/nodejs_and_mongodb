import Joi from 'joi';

//signup validation joi
const regVal = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required()
})
//user signup validation joi
const UserRegVal = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required()
})

export {regVal, UserRegVal}