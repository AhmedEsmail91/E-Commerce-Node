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
    // total number of exist products is : 6.
    // skip=(pageNum-1)*pageLimit
    // ""*1 returns Nan
    let pageNum = Math.ceil(Math.abs(req.query.page*1||1));
    let pageLimit = 2;
    let skip = (pageNum-1)*pageLimit;
    // shallow copy of req.query this means the assigned variable is passed by reference so if we change the value of filterObj it will also change the value of req.query.
    // deep copy by value of req.query filterObj={...req.query} for now. is deep copy.
    // 
    // ?price[gte]=100&price[lte]=200&rating[gte]=4&sort=price -->returns
    // {
    //   price: { gte: '100', lte: '200' },
    //   rating: { gte: '4' },
    //   sort: 'price'
    // }
    let excluded=["page","sort","limit","fields"]; // we just want to filter the products.
    //deep copy:
    let filterObj=Object.assign({},req.query);
    // get the fields to be excluded from the filterObj
    excluded.forEach((el)=>delete filterObj[el]);
    // convert the filterObj to string to replace the gte,gt,lte,lt with $gte,$gt,$lte,$lt
    filterObj=JSON.stringify(filterObj);
    // replace the gte,gt,lte,lt with $gte,$gt,$lte,$lt
    filterObj=filterObj.replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`);
    // convert the string to object
    filterObj=JSON.parse(filterObj);
    // console.log(filterObj);
    //------------------------------Query Building & Sorting-----------------------------------
    // limit, skip, sort, fields --> functions chaining.
    //without "await" it's a build query.
    const mongooseQuery = productModel.find(filterObj).skip(skip).limit(pageLimit); 
    if(req.query.sort){
        // by default sort by createdAt in descending order.
        // in url if we want to sort by price then we will pass sort=price for descending order and -price for ascending order.
        let sortBy=req.query.sort.split(",").join(" ");
        console.log(sortBy,req.query.sort);
        mongooseQuery.sort(sortBy);
    }
    let products=await mongooseQuery;
    !(products.length>=1) && res.status(404).json({message:"Product not found"});
    (products.length >=1) && res.status(200).json({message: "success",page:pageNum,products:products});
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