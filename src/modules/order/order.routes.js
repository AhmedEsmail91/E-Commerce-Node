import express from 'express'
import  validate  from '../../middlewares/validation.js';
import { protectedRoute,allowedTo } from '../auth/auth.controllers.js';
import orderValidation from './order.validation.js';
import OrderController from './order.controller.js'

const OrderRouter = express.Router();
OrderRouter.use(protectedRoute,allowedTo('user','admin')); // Protected & Authorized Route
// Raw Route
OrderRouter.route('/')
.post(validate(orderValidation.createOrderVal),OrderController.createCashOrder)
.get(allowedTo('admin'),OrderController.getAllOrders)
.get(OrderController.getUserOrder)

export default OrderRouter