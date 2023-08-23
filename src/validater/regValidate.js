import Joi from "joi";

//signup validation joi
const regVal = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});
//user signup validation joi
const UserRegVal = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).required(),
});
// assign role
const roleVal = Joi.object({
  role: Joi.string().valid("admin", "user"),
});

//update profile
const updateProfVal = Joi.object({
  name: Joi.string(),
  email: Joi.string()
});
export { regVal, UserRegVal, roleVal, updateProfVal };
