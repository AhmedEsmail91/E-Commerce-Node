import categoryRoutes from './category/category.routes.js'
export const bootstrap=(app)=>{
    app.get("/",(req,res)=>{
        res.send("Hello World!")
    });
    app.use('/api/v1/categories',categoryRoutes);
}
