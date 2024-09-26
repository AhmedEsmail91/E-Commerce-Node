import express from 'express'
//Utils
import TruncateTable from "../../utils/TruncateTable.js"
import { couponModel } from '../../../databases/models/coupon.model.js';
//Validation Middlewares
import  validate  from '../../middlewares/validation.js';
import couponVal from './coupon.validation.js';
import couponController from './coupon.controller.js'
//Authentication And Authorization Middlewares
import { protectedRoute,allowedTo } from '../auth/auth.controllers.js';
//Router
const couponRouter = express.Router({mergeParams:true});

//Protected Route and AllowedTo Middleware for all routes
couponRouter.use(protectedRoute, allowedTo('admin','user'));

// Raw Route
couponRouter.route('/')
.get(couponController.getAllCoupon)

.post(validate(couponVal.addCouponVal),
    couponController.addCoupon)

.delete(TruncateTable(couponModel));

// Route with Id
couponRouter.route('/:id')
.get(validate(couponVal.paramsIdVal),
    couponController.getSingleCoupon)
    
.put(validate(couponVal.updateCouponVal),
    couponController.updateCoupon)

.delete(validate(couponVal.paramsIdVal),
    couponController.deleteCoupon);

export default couponRouter