// import { truncate } from "fs";
import { categoryModel } from "../../../databases/models/category.model.js";
import slugify from "slugify";
import { catchError } from "../../middlewares/catchError.js";
// CRUD Category:
const addCategory = catchError(async (req, res) => {
    req.body.name && (req.body.slug = slugify(req.body.name, { lower: true }));
    req.file && (req.body.image = req.file.filename);
    let category= new categoryModel(req.body);
    console.log(category);
    await category.save();
    res.status(201).json({ message: "success", category });
})

const getAllCategories = catchError(async (req, res) => {
    const categories = await categoryModel.find({});
    !(categories.length>=1) && res.status(404).json({message:"Category not found"});
    (categories.length >=1) && res.status(200).json({message: "success",categories:categories});
})

const getSingleCategory = catchError(async (req, res) => {
    const category = await categoryModel.findById(req.params.id);
    !category && res.status(404).json({message:"Category not found"});
    category && res.status(200).json({message: "success", category:category});
})

const updateCategory = catchError(async (req, res) => {
    req.body.name && (req.body.slug = slugify(req.body.name, { lower: true }));
    req.file && (req.body.image = req.file.filename);

    const category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    !category && res.status(404).json({message:"Category not found"});
    category && res.status(200).json({message: "success", category:category});
    
})
const deleteCategory = catchError(async (req, res) => {
    const category = await categoryModel.findByIdAndDelete(req.params.id,{new:true});
    !category && res.status(404).json({message:"Category not found"});
    category && res.status(200).json({message: "success", category:category});
})

export default {addCategory,getAllCategories,getSingleCategory,updateCategory,deleteCategory};