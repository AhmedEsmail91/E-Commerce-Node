

import Joi from "joi"

const signupSchemaVal = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    rePassword: Joi.valid(Joi.ref('password')).required()
})


const signinSchemaVal = Joi.object({ 
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
})
const changePasswordSchemaVal = Joi.object({
    // id:Joi.string().hex().length(24).required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
    newPassword: Joi.valid(Joi.ref('password')).required()
})


export {
    signupSchemaVal,
    signinSchemaVal,
    changePasswordSchemaVal
}