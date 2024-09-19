import { catchError } from "../../middlewares/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import {reviewModel} from "./../../../databases/models/review.model.js";
import AppError from "../../utils/AppError.js";
const addReview = catchError(async (req, res,next) => {
    req.body.user = req.user._id;
    let isReviewed=await reviewModel.findOne({user:req.user._id,product:req.body.product});
    if(isReviewed) return next(new AppError("You have already reviewed this product.",400));
    
    let review= new reviewModel(req.body);
    await review.save();
    res.status(201).json({ message: "success", review });
})

const getAllReview = catchError(async (req, res) => {
    const apiFeatures = new ApiFeatures(reviewModel.find({}), req.query)
    .pagination(10).filtration().sort().fields().search();

    let Review = await apiFeatures.mongooseQuery;
    !(Review.length>=1) && res.status(404).json({message:"review not found"});
    (Review.length >=1) && res.status(200).json({message: "success",Review:Review});
})

const getSingleReview = catchError(async (req, res) => {
    const review = await reviewModel.findById(req.params.id);
    !review && res.status(404).json({message:"review not found"});
    review && res.status(200).json({message: "success", review:review});
})

const updateReview = catchError(async (req, res) => {
    let review=await reviewModel.findOneAndUpdate({user:req.user._id,_id:req.params.id},req.body,{new:true});
    !review && res.status(404).json({message:"review not found"});
    review && res.status(200).json({message: "success", review:review});
    
})
const deleteReview = deleteOne(reviewModel);

export default {addReview,getAllReview,getSingleReview,updateReview,deleteReview};