import express from 'express'
import  validate  from '../../middlewares/validation.js';
import { protectedRoute,allowedTo } from '../auth/auth.controllers.js';
import addressVal from './address.validation.js';
import AddressController from './address.controller.js'

const AddressRouter = express.Router();


// Raw Route
AddressRouter.route('/').patch(protectedRoute,allowedTo('user'),validate(addressVal.addToAddressVal),
AddressController.addToAddress)
.get(protectedRoute,allowedTo('user'),AddressController.getLoggedUserAddresses);



// Route with Id
AddressRouter.route('/:id')
.delete(protectedRoute,allowedTo('user','admin'), //authentication and authorization middleware
        validate(addressVal.paramsIdVal), // Validation middleware
        AddressController.removeFromAddress); // Controller Methods

export default AddressRouter