import Joi from 'joi';
const createOrderVal= Joi.object({
//    product: Joi.string().hex().length(24).required(),
   shippingAddress: Joi.object ({
         street: Joi.string().required().trim(),
         city: Joi.string().required().trim(),
         phone: Joi.string().required().trim(),
   }).required(),
});
const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
});
const updateQTYVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    quantity: Joi.number().required().options({ convert: false })
});
const addCouponVal = Joi.object({
    coupon: Joi.string().required()
});
export default {createOrderVal,paramsIdVal};