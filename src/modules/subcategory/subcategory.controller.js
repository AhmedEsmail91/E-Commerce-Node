
import slugify from "slugify";
import { subCategoryModel } from "../../../databases/models/subcategory.model.js";
import { catchError } from "../../middlewares/catchError.js";

const addsubCategory = catchError(async (req, res) => {
    req.file && (req.body.image = req.file.filename);
    req.body.slug=slugify(req.body.name,{lower:true});
    let subCategory= new subCategoryModel(req.body);
    console.log(subCategory);
    await subCategory.save();
    res.status(201).json({ message: "success", subCategory });
})

const getAllSubCategories = catchError(async (req, res) => {
    const SubCategories = await subCategoryModel.find({});
    !(SubCategories.length>=1) && res.status(404).json({message:"SubCategory not found"});
    (SubCategories.length >=1) && res.status(200).json({message: "success",SubCategories:SubCategories});
})

const getSingleSubCategory = catchError(async (req, res) => {
    const subCategory = await subCategoryModel.findById(req.params.id);
    !subCategory && res.status(404).json({message:"SubCategory not found"});
    subCategory && res.status(200).json({message: "success", subCategory:subCategory});
})

const updatesubCategory = catchError(async (req, res) => {
     
    req.file && (req.body.image = req.file.filename);

    const subCategory = await subCategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    !subCategory && res.status(404).json({message:"SubCategory not found"});
    subCategory && res.status(200).json({message: "success", subCategory:subCategory});
    
})
const deletesubCategory = catchError(async (req, res) => {
    const subCategory = await subCategoryModel.findByIdAndDelete(req.params.id,{new:true});
    !subCategory && res.status(404).json({message:"SubCategory not found"});
    subCategory && res.status(200).json({message: "success", subCategory:subCategory});
})

export default {addsubCategory,getAllSubCategories,getSingleSubCategory,updatesubCategory,deletesubCategory};