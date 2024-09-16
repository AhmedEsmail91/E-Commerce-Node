import express from 'express'
import categoryController from './category.controller.js'
import TruncateTable from "../../utils/TruncateTable.js"
import { categoryModel } from '../../../databases/models/category.model.js';
import categoryVal from './category.validation.js';
import  validate  from '../../middlewares/validation.js';
import Upload  from '../../services/fileUploads/uploads.js';
import unique from '../../middlewares/unique.js';
import subCategoryRouter from '../subcategory/subcategory.routes.js';
import { protectedRoute } from '../auth/auth.controllers.js';
const categoryRouter = express.Router();
//Getting all subCategories of a category
// we add it here to make the route /categories/:id/subcategories and categories router already has a pre-fix of /categories
categoryRouter.use('/:category/subcategories/',subCategoryRouter);

// categoryRouter --> this provide a route for /api/v1/categories for the url, then after adding the ret of url we can add another route which provides all of its routes name
// in the subcategory.routes.js we have:

// subCategoryRouter.route('/')
// .get(categoryController.getAllSubCategories)

// the previous route is for /api/v1/categories/ and the next route is for /api/v1/categories/:id/subcategories
// so we can concatenate the two routes to make the route /api/v1/categories/:id/subcategories and add some more urls.
// Raw Route


categoryRouter.route('/')
.get(categoryController.getAllCategories)

.post(protectedRoute,Upload.uploadSingleFile('image'),
    validate(categoryVal.addCategoryVal),
    categoryController.addCategory)

.delete(TruncateTable(categoryModel));

// Route with Id
categoryRouter.route('/:id')
.get(validate(categoryVal.paramsIdVal),
    categoryController.getSingleCategory)
    
.put(protectedRoute,Upload.uploadSingleFile('img'),
    validate(categoryVal.updateCategoryVal),
    categoryController.updateCategory)

.delete(protectedRoute,validate(categoryVal.paramsIdVal),
    categoryController.deleteCategory);

export default categoryRouter