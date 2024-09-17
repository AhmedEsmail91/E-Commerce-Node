import { catchError } from "../../middlewares/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import {couponModel} from "./../../../databases/models/coupon.model.js";
import AppError from "../../utils/AppError.js";

const addCoupon = catchError(async (req, res,next) => {
    req.body.user = req.user._id;
    let isCouponExist=await couponModel.findOne({code:req.body.code});
    if(isCouponExist) return next(new AppError("Coupon already exist",400));
    let Coupon = new couponModel(req.body);
    Coupon = await Coupon.save();
    !Coupon && res.status(400).json({message:"Coupon not created"});
    res.status(201).json({ message: "success", Coupon });
})

const getAllCoupon = catchError(async (req, res) => {
    const apiFeatures = new ApiFeatures(couponModel.find({}), req.query).
    pagination(10).filtration().sort().fields().search();

    let Coupon = await apiFeatures.mongooseQuery;
    !(Coupon.length>=1) && res.status(404).json({message:"Coupon not found"});
    (Coupon.length >=1) && res.status(200).json({message: "success",Coupon:Coupon});
})

const getSingleCoupon = catchError(async (req, res) => {
    const Coupon = await couponModel.findById(req.params.id);
    !Coupon && res.status(404).json({message:"Coupon not found"});
    Coupon && res.status(200).json({message: "success", Coupon:Coupon});
})

const updateCoupon = catchError(async (req, res) => {
    let Coupon=await couponModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    !Coupon && res.status(404).json({message:"Coupon not found"});
    Coupon && res.status(200).json({message: "success", Coupon:Coupon});
    
})
const deleteCoupon = deleteOne(couponModel);

export default {addCoupon,getAllCoupon,getSingleCoupon,updateCoupon,deleteCoupon};