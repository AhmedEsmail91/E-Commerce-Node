import Joi from 'joi';
// name:{
//     type:String,
//     unique:[true,"Category name is already exist"],
//     required:[true,"Category name is required"],
//     trim:true,// as strip() in python
//     minLength:[5,"Category name must be at least 5 characters"],
// },
// slug:{ // used in the URL to be user friendly url for SEO
//     type:String,
//     lowercase:true,
//     required:[true,"Category slug is required"],
// },
// image:{// image path
//     type:String
// },
// createdBy:{
//     type:mongoose.Types.ObjectId,
//     ref:"user"  
// }
const addCategoryVal= Joi.object({
    name: Joi.string().min(5).max(100).required().trim(),
    // image: Joi.string().required()
});
const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
});
const updateCategoryVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(5).max(100).required().trim(),
});

export default {addCategoryVal,paramsIdVal,updateCategoryVal};