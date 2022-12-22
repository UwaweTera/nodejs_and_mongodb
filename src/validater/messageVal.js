import Joi from 'joi';

const authContact = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(10).required(),
});

export default authContact