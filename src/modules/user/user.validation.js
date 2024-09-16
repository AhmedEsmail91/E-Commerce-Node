import Joi from 'joi';
const addUser= Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    rePassword: Joi.valid(Joi.ref('password')).required(),
});
const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
});
const updateUserVal = Joi.object({
    id: Joi.string().hex().length(24),
    name: Joi.string().min(2).max(2),
    email: Joi.string().email(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    rePassword: Joi.valid(Joi.ref('password')),
    role: Joi.string().valid('admin', 'user'),
});

export default {addUser,paramsIdVal,updateUserVal};