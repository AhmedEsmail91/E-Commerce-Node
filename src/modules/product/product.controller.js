// import { truncate } from "fs";
import { productModel } from "../../../databases/models/product.model.js";
import slugify from "slugify";
import { catchError } from "../../middlewares/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
// CRUD Product:
const addProduct = catchError(async (req, res) => {
    req.body.title && (req.body.slug = slugify(req.body.title, { lower: true }));
    req.body.imgCover=req.files.imgCover[0].filename
    req.body.images=req.files.images.map((file)=>file.filename);
    
    let product= new productModel(req.body);
    await product.save();
    res.status(201).json({ message: "success", product });
})

const getAllProducts = catchError(async (req, res) => {
    const products = await productModel.find({});
    !(products.length>=1) && res.status(404).json({message:"Product not found"});
    (products.length >=1) && res.status(200).json({message: "success",products:products});
})

const getSingleProduct = catchError(async (req, res) => {
    const product = await productModel.findById(req.params.id);
    !product && res.status(404).json({message:"Product not found"});
    product && res.status(200).json({message: "success", product:product});
})

const updateProduct = catchError(async (req, res) => {
    req.body.name && (req.body.slug = slugify(req.body.name, { lower: true }));
    req.file.filename && (req.body.image = req.file.filename);

    const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    !product && res.status(404).json({message:"Product not found"});
    product && res.status(200).json({message: "success", product:product});
    
})
const deleteProduct = deleteOne(productModel);

export default {addProduct,getAllProducts,getSingleProduct,updateProduct,deleteProduct};