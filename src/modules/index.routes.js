import { globalError } from '../middlewares/globalError.js';
import categoryRoutes from './category/category.routes.js'
import subCategoryRoutes from './subcategory/subcategory.routes.js'
import brandRoutes from './brand/brand.routes.js'
import productRoutes from './product/product.routes.js'
import express from 'express';
import usersRouter from './user/user.routes.js';
import authRouter from './auth/auth.routes.js';
import reviewRouter from './subcategory copy/review.routes.js';

export const bootstrap=(app)=>{
    // app.get("/",(req,res)=>{
    //     res.send("Hello World!")
    // });
    app.use('/uploads', express.static('uploads'));
    app.use('/api/v1/categories',categoryRoutes);
    app.use('/api/v1/subcategories',subCategoryRoutes);
    app.use('/api/v1/brands',brandRoutes);
    app.use('/api/v1/products',productRoutes);
    app.use('/api/v1/users',usersRouter);
    app.use('/api/v1/auth',authRouter);
    app.use('/api/v1/reviews',reviewRouter);
    
    
    // app.get("/schema",(req,res)=>{
    //     res.json(Object.keys(productModel.schema.obj));
    // });
    app.use('*',(req,res,next)=>{
        res.status(404).json({message:"Page not found (Wrong URL)"});
    })
    app.use(globalError);
}
