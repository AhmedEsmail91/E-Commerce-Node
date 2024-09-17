import Joi from 'joi';
const addToAddressVal= Joi.object({
   street: Joi.string().required().trim(),
   phone: Joi.string().required().trim(),
   city: Joi.string().required().trim(),
});
const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
});
const updateAddressesVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    street: Joi.string().trim(),
   phone: Joi.string().trim(),
   city: Joi.string().trim(),
});

export default {addToAddressVal,paramsIdVal,updateAddressesVal};