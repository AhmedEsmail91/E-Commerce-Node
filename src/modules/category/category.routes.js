import Router from 'express'
const categoryRouter = Router();
import categoryController from './category.controller.js'
import {categoryModel} from '../../../databases/models/category.model.js'

import TruncateTable from '../../utils/TruncateTable.js';
categoryRouter.route('/categories')
.post(categoryController.addCategory)
.get(categoryController.getCategories)

.delete(TruncateTable(categoryModel));
export default categoryRouter