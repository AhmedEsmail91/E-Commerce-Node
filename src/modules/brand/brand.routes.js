import express from 'express'
import brandController from './brand.controller.js'
import TruncateTable from "../../utils/TruncateTable.js"
import { brandModel } from '../../../databases/models/brand.model.js';
import brandVal from './brand.validation.js';
import  validate  from '../../middlewares/validation.js';
import Upload  from '../../services/fileUploads/uploads.js';
const brandRouter = express.Router();

// Raw Route
brandRouter.route('/')
.get(brandController.getAllBrands)

.post(Upload.uploadSingleFile('logo'),
    validate(brandVal.addBrandVal),
    brandController.addBrand)

.delete(TruncateTable(brandModel));

// Route with Id
brandRouter.route('/:id')
.get(validate(brandVal.paramsIdVal),
    brandController.getSingleBrand)
    
.put(Upload.uploadSingleFile('img'),
    validate(brandVal.updateBrandVal),
    brandController.updateBrand)

.delete(validate(brandVal.paramsIdVal),
    brandController.deleteBrand);

export default brandRouter