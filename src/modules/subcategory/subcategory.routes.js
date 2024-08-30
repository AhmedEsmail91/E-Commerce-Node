import Router from 'express'
import categoryController from './subcategory.controller.js'
import TruncateTable from "../../utils/TruncateTable.js"
import { subCategoryModel } from '../../../databases/models/subcategory.model.js';
import subCategoryVal from './subcategory.validation.js';
import  validate  from '../../middlewares/validation.js';

const subCategoryRouter = Router();

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