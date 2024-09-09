import express from 'express'
import productController from './product.controller.js'
import TruncateTable from "../../utils/TruncateTable.js"
import { productModel } from '../../../databases/models/product.model.js';
import productVal from './product.validation.js';
import  validate  from '../../middlewares/validation.js';
import Upload  from '../../services/fileUploads/uploads.js';
import unique from '../../middlewares/unique.js';
const productRouter = express.Router();

// Raw Route
productRouter.route('/')
.get(productController.getAllProducts)

.post(
    Upload.uploadFields([
        {name:'imgCover',maxCount:1},
        { name:'images', maxCount:15}]),
    validate(productVal.addProductVal),
    productController.addProduct)

.delete(TruncateTable(productModel));

// Route with Id
productRouter.route('/:id')
.get(validate(productVal.paramsIdVal),
    productController.getSingleProduct)
    
.put(Upload.uploadSingleFile('img'),
    validate(productVal.updateProductVal),
    productController.updateProduct)

.delete(validate(productVal.paramsIdVal),
    productController.deleteProduct);

export default productRouter