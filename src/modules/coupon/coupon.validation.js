import Joi from 'joi';

const addCouponVal= Joi.object({
    code: Joi.string().min(5).max(200).required().trim(),
    discount: Joi.number().min(0).required(),
    expires:Joi.date().required()
});
const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
});
const updateCouponVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    code: Joi.string().min(5).max(200).trim(),
    discount: Joi.number().min(0),
    expires:Joi.date()
});

export default {addCouponVal,paramsIdVal,updateCouponVal};