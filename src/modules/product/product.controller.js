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

const getAllProducts = catchError(async (req, res,next) => {
    // Pagination Section
    let pageNum = Math.ceil(Math.abs(req.query.page*1||1));
    let pageLimit = 2;
    let skip = (pageNum-1)*pageLimit;

    // Filtering Section
    // URL--> ?price[gte]=100&price[lte]=200&rating[gte]=4&sort=price --> {price:{$gte:100,$lte:200},rating:{$gte:4}}
    let excluded=["page","sort","limit","fields"];
    // exclude the fileds, page,sort and limit to just get the filteration
    // ,cuz the filteration is not categorized in the query.
    let filterObj=Object.assign({},req.query);
    excluded.forEach((el)=>delete filterObj[el]);
    filterObj=JSON.parse(JSON.stringify(filterObj).replace(/\b(gte|gt|lte|lt)\b/g,match=>`$${match}`));

    // Query Building Section with Filtering & Pagination.
    const mongooseQuery = productModel.find(filterObj).skip(skip).limit(pageLimit); 

    // Adding Sorting to Builder Query
    if(req.query.sort){
        // in Sort Clause we can sort by multiple fields by separating them with Space.
        let sortBy=req.query.sort.split(",").join(" ");
        mongooseQuery.sort(sortBy);
    }
    // Adding Selected Feilds to Builder Query
    if(req.query.fields){
        let fields=req.query.fields.split(",").join(" ");
        mongooseQuery.select(fields);
    }
    //Executing the Query
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