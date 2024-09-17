import express from 'express'
import reviewController from './review.controller.js'
import TruncateTable from "../../utils/TruncateTable.js"
import { reviewModel } from '../../../databases/models/review.model.js';
import reviewVal from './review.validation.js';
import  validate  from '../../middlewares/validation.js';
import { protectedRoute,allowedTo } from '../auth/auth.controllers.js';
const reviewRouter = express.Router({mergeParams:true});

// Raw Route
reviewRouter.route('/')
.get(reviewController.getAllReview)

.post(protectedRoute,allowedTo('user'),validate(reviewVal.addReviewVal),
    reviewController.addReview)

.delete(TruncateTable(reviewModel));

// Route with Id
reviewRouter.route('/:id')
.get(validate(reviewVal.paramsIdVal),
    reviewController.getSingleReview)
    
.put(protectedRoute,allowedTo('user'),validate(reviewVal.updateReviewVal),
    reviewController.updateReview)

.delete(protectedRoute,allowedTo('user','admin'),validate(reviewVal.paramsIdVal),
    reviewController.deleteReview);

export default reviewRouter