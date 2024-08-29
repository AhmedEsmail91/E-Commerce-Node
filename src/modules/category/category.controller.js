// import { truncate } from "fs";
import { categoryModel } from "../../../databases/models/category.model.js";
import slugify from "slugify";
// CRUD Category:
const addCategory = async (req, res) => {
    // await categoryModel.insertMany(req.body);//insertMany is used to insert multiple documents into the collection as Bulk.
    // const category =categoryModel.create(req.body); // create is used to insert documents by sequence step-by-step.
    req.body.slug=slugify(req.body.name,{lower:true});// slugify is used to convert the name to slug.
    let category= new categoryModel(req.body);
    // save is used to insert a single document into the collection and return the inserted document in variable.
    // i can configurate the variable like adding and removing fields before saving the document. like this:
    // category.name="new name";
    console.log(category);
    // category.slug=category.name.toLowerCase().split(" ").join("-"); // or simply use slugify package
    await category.save();
    res.status(201).json({ message: "success", category });
};

const getAllCategories = async (req, res) => {
    const categories = await categoryModel.find({});
    !(categories.length>=1) && res.status(404).json({message:"Category not found"});
    (categories.length >=1) && res.status(200).json({message: "success", categories:categories});
};

const getSingleCategory = async (req, res) => {
    const category = await categoryModel.findById(req.params.id);
    !category && res.status(404).json({message:"Category not found"});
    category && res.status(200).json({message: "success", category:category});
};
const updateCategory = async (req, res) => {
    req.body.slug = slugify(req.body.name, { lower: true });
    const category = await categoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    !category && res.status(404).json({message:"Category not found"});
    category && res.status(200).json({message: "success", category:category});
    
};
const deleteCategory = async (req, res) => {
    const category = await categoryModel.findByIdAndDelete(req.params.id,{new:true});
    !category && res.status(404).json({message:"Category not found"});
    category && res.status(200).json({message: "success", category:category});
};

export default {addCategory,getAllCategories,getSingleCategory,updateCategory,deleteCategory};