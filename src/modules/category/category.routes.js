import Router from 'express'
import categoryController from './category.controller.js'
import TruncateTable from "../../utils/TruncateTable.js"
import { categoryModel } from '../../../databases/models/category.model.js';
const categoryRouter = Router();
// localhost:3000/api/v1/categories --> Already defined in index.routes.js
categoryRouter.route('/').get(categoryController.getAllCategories).post(categoryController.addCategory).delete(TruncateTable(categoryModel));
categoryRouter.route('/:id').get(categoryController.getSingleCategory).put(categoryController.updateCategory).delete(categoryController.deleteCategory);
export default categoryRouter