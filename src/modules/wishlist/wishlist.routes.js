import express from 'express'
import  validate  from '../../middlewares/validation.js';
import { protectedRoute,allowedTo } from '../auth/auth.controllers.js';
import wishlistVal from './wishlist.validation.js';
import wishListController from './wishlist.controller.js'

const wishListRouter = express.Router();


// Raw Route
wishListRouter.route('/').patch(protectedRoute,allowedTo('user'),validate(wishlistVal.addToWishlistVal),
wishListController.addToWishlist)
.get(protectedRoute,allowedTo('user'),wishListController.getUserWishlist);



// Route with Id
wishListRouter.route('/:id')
.delete(protectedRoute,allowedTo('user','admin'), //authentication and authorization middleware
        validate(wishlistVal.paramsIdVal), // Validation middleware
        wishListController.removeFromWishlist); // Controller Methods

export default wishListRouter