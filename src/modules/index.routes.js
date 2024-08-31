import { globalError } from '../middlewares/globalError.js';
import categoryRoutes from './category/category.routes.js'
import subCategoryRoutes from './subcategory/subcategory.routes.js'
import brandRoutes from './brand/brand.routes.js'
import { brandModel } from '../../databases/models/brand.model.js';
import express from 'express';
export const bootstrap=(app)=>{
    // app.get("/",(req,res)=>{
    //     res.send("Hello World!")
    // });
    app.use('/uploads', express.static('uploads'));
    app.use('/api/v1/categories',categoryRoutes);
    app.use('/api/v1/subcategories',subCategoryRoutes);
    app.use('/api/v1/brands',brandRoutes);
    app.use(globalError);
    
    app.use('*',(req,res,next)=>{
        res.status(404).json({message:"Page not found (Wronge URL)"});
    })
}
