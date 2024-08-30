import Router from 'express'
import categoryController from './category.controller.js'
import TruncateTable from "../../utils/TruncateTable.js"
import { categoryModel } from '../../../databases/models/category.model.js';
import categoryVal from './category.validation.js';
import  validate  from '../../middlewares/validation.js';
import Upload  from '../../services/fileUploads/uploads.js';
import unique from '../../middlewares/unique.js';
const categoryRouter = Router();

// Raw Route
categoryRouter.route('/')
.get(categoryController.getAllCategories)

.post(Upload.uploadSingleFile('image'),
    validate(categoryVal.addCategoryVal),
    categoryController.addCategory)

.delete(TruncateTable(categoryModel));

// Route with Id
categoryRouter.route('/:id')
.get(validate(categoryVal.paramsIdVal),
    categoryController.getSingleCategory)
    
.put(Upload.uploadSingleFile('img'),
    validate(categoryVal.updateCategoryVal),
    categoryController.updateCategory)

.delete(validate(categoryVal.paramsIdVal),
    categoryController.deleteCategory);

export default categoryRouter