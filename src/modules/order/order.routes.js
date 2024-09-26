import express from 'express'
import  validate  from '../../middlewares/validation.js';
import { protectedRoute,allowedTo } from '../auth/auth.controllers.js';
import orderValidation from './order.validation.js';
import OrderController from './order.controller.js'
import TruncateTable from "../../utils/TruncateTable.js"
import { orderModel } from '../../../databases/models/order.model.js';


const OrderRouter = express.Router();
OrderRouter.use(protectedRoute,allowedTo('user','admin')); // Protected & Authorized Route
// Raw Route
OrderRouter.route('/')
.delete(TruncateTable(orderModel))
.post(validate(orderValidation.createOrderVal),OrderController.createCashOrder)
.get(allowedTo('user'),OrderController.getAllOrders)
OrderRouter.get("/user/",OrderController.getUserOrder)

OrderRouter.route("/checkOut")
.post(OrderController.createCheckOutSession)
export default OrderRouter