// import { truncate } from "fs";
import { brandModel } from "../../../databases/models/brand.model.js";
import slugify from "slugify";
import { catchError } from "../../middlewares/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
// CRUD Brand:
const addBrand = catchError(async (req, res) => {
    req.body.name && (req.body.slug = slugify(req.body.name, { lower: true }));
    req.file && (req.body.logo = req.file.filename);
    let brand= new brandModel(req.body);
    console.log(brand);
    await brand.save();
    res.status(201).json({ message: "success", brand });
})

const getAllBrands = catchError(async (req, res) => {
    const apiFeatures = new ApiFeatures(brandModel.find(), req.query);
    apiFeatures.pagination(10).filtration().sort().fields().search();
    let brands = await apiFeatures.mongooseQuery;
    
    !(brands.length>=1) && res.status(404).json({message:"Brand not found"});
    (brands.length >=1) && res.status(200).json({message: "success",brands:brands});
})

const getSingleBrand = catchError(async (req, res) => {
    const brand = await brandModel.findById(req.params.id);
    !brand && res.status(404).json({message:"Brand not found"});
    brand && res.status(200).json({message: "success", brand:brand});
})

const updateBrand = catchError(async (req, res) => {
    req.body.name && (req.body.slug = slugify(req.body.name, { lower: true }));
    req.file && (req.body.logo = req.file.filename);

    const brand = await brandModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    !brand && res.status(404).json({message:"Brand not found"});
    brand && res.status(200).json({message: "success", brand:brand});
    
})
const deleteBrand = deleteOne(brandModel);

export default {addBrand,getAllBrands,getSingleBrand,updateBrand,deleteBrand};