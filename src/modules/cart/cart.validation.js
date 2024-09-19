import Joi from 'joi';
const addToCartVal= Joi.object({
   product: Joi.string().hex().length(24).required(),
   quantity: Joi.number().min(1).optional().options({ convert: false }),
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
export default {addToCartVal,paramsIdVal,updateQTYVal,addCouponVal};