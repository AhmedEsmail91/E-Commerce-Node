import express from 'express'
import  validate  from '../../middlewares/validation.js';
import { protectedRoute,allowedTo } from '../auth/auth.controllers.js';
import cartVal from './cart.validation.js';
import CartController from './cart.controller.js'

const CartRouter = express.Router();

CartRouter.use(protectedRoute,allowedTo('user','admin')); // Protected & Authorized Route
// Raw Route
CartRouter.route('/')
.post(validate(cartVal.addToCartVal), CartController.addToCart)
.get(CartController.getLoggedUserCartes)
.delete(CartController.clearUserCart)
// Apply Coupon
CartRouter.post('/applyCoupon', validate(cartVal.addCouponVal), CartController.applyCoupon);





// Route with Id
CartRouter.route('/:id')
.put(validate(cartVal.updateQTYVal), // Validation middleware
        CartController.updateQuantity)
.delete(validate(cartVal.paramsIdVal), // Validation middleware
        CartController.removeFromCart); // Controller Methods

export default CartRouter