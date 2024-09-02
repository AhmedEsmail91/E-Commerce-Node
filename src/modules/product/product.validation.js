import Joi from 'joi';


const addProductVal= Joi.object({
    title: Joi.string().min(5).max(100).trim().required(),
    description: Joi.string().min(5).max(1500).required().trim(),
    price: Joi.number().min(0).required().required(),
    priceAfterDiscount: Joi.number().less(Joi.ref('price')).optional(),
    quantity: Joi.number().min(0).optional(),
    category: Joi.string().hex().length(24).required(),
    subcategory: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),
    createdBy: Joi.string().hex().length(24).optional(),

    
    imgCover:Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png','image/jpg'),
        size: Joi.number().max(10485760),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string()
    })).required(),

    images: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png','image/jpg'),
        size: Joi.number().max(10485760),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string()
    })).required()
    
});
const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24)
});
const updateProductVal = Joi.object({
    id: Joi.string().hex().length(24).required(),

    title: Joi.string().min(5).max(100).trim().required(),
    description: Joi.string().min(5).max(1500).required().trim(),
    price: Joi.number().min(0).required().required(),
    priceAfterDiscount: Joi.number().less(Joi.ref('price')).optional(),
    quantity: Joi.number().min(0).optional(),
    category: Joi.string().hex().length(24).required(),
    subCategory: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),
    createdBy: Joi.string().hex().length(24).optional(),

    imgCover:Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png','image/jpg'),
        size: Joi.number().max(10485760),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    })).optional(),
    
    images: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png','image/jpg'),
        size: Joi.number().max(10485760),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required()
    })).optional()
});

export default {addProductVal,paramsIdVal,updateProductVal};