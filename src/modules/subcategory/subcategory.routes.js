import express from 'express'
import categoryController from './subcategory.controller.js'
import TruncateTable from "../../utils/TruncateTable.js"
import { subCategoryModel } from '../../../databases/models/subcategory.model.js';
import subCategoryVal from './subcategory.validation.js';
import  validate  from '../../middlewares/validation.js';
// this is to merge the params from the parent route to this route ,
// so that we can access the parent route params in this route as well as the params of this route itself.
const subCategoryRouter = express.Router({mergeParams:true});

// Raw Route
subCategoryRouter.route('/')
.get(categoryController.getAllSubCategories)

.post(validate(subCategoryVal.addSubCategoryVal),
    categoryController.addsubCategory)

.delete(TruncateTable(subCategoryModel));

// Route with Id
subCategoryRouter.route('/:id')
.get(validate(subCategoryVal.paramsIdVal),
    categoryController.getSingleSubCategory)
    
.put(validate(subCategoryVal.updateSubCategoryVal),
    categoryController.updatesubCategory)

.delete(validate(subCategoryVal.paramsIdVal),
    categoryController.deletesubCategory);

export default subCategoryRouter