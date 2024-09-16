import Joi from 'joi';
/**
 * text:{
        type:String,
        trim:true,
        minLength:[10,"Review text must be at least 10 characters"],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    
 */

const addReviewVal= Joi.object({
    text: Joi.string().min(5).max(200).required().trim(),
    rate: Joi.number().min(0).max(5).required(),
    product:Joi.string().hex().length(24).required()
});
const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
});
const updateReviewVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    text: Joi.string().min(5).max(200).trim(),
    rate: Joi.number().min(0).max(5),
    product:Joi.string().hex().length(24)
});

export default {addReviewVal,paramsIdVal,updateReviewVal};