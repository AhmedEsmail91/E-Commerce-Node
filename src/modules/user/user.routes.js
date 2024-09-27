import express from 'express'
import userController from './user.controller.js'
import TruncateTable from "../../utils/TruncateTable.js"
import { userModel } from '../../../databases/models/user.model.js';
import usersVal from './user.validation.js';
import  validate  from '../../middlewares/validation.js';
import { checkMail } from '../../middlewares/checkMail.js';
import { allowedTo,protectedRoute } from '../auth/auth.controllers.js';
const usersRouter = express.Router();

// Raw Route
usersRouter.route('/')
.post(validate(usersVal.addUser),checkMail,
    userController.addUser)

.get(protectedRoute,allowedTo('admin'),userController.getAllUsers)

.delete(TruncateTable(userModel));

// Route with Id
usersRouter.route('/:id')
.get(validate(usersVal.paramsIdVal),
    userController.getSingleUser)
    
.put(validate(usersVal.updateUserVal),
    userController.updateUser)

.delete(validate(usersVal.paramsIdVal),
    userController.deleteUser);

export default usersRouter