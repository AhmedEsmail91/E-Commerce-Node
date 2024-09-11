
import slugify from "slugify";
import { subCategoryModel } from "../../../databases/models/subcategory.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

const addsubCategory = catchError(async (req, res) => {
    req.file && (req.body.image = req.file.filename);
    req.body.slug=slugify(req.body.name,{lower:true});
    let subCategory= new subCategoryModel(req.body);
    console.log(subCategory);
    await subCategory.save();
    res.status(201).json({ message: "success", subCategory });
})

const getAllSubCategories = catchError(async (req, res) => {
    // to get all subcategories of a category if the category is provided, otherwise get all subcategories from the main route
    let filterObj={}
    req.params.category && (filterObj={category:req.params.category});
    console.log(req.params);
    const apiFeatures = new ApiFeatures(subCategoryModel.find(filterObj), req.query);
    apiFeatures.pagination(10).filteration().sort().fields().search();
    
    let SubCategories = await apiFeatures.mongooseQuery;

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
const deletesubCategory = deleteOne(subCategoryModel);

export default {addsubCategory,getAllSubCategories,getSingleSubCategory,updatesubCategory,deletesubCategory};