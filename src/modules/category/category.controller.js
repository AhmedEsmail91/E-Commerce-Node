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

const getCategories = async (req, res) => {
    const categories = await categoryModel.find();
    res.status(200).json(categories);
};

export default {addCategory,getCategories};