import mongoose from "mongoose";
const dbConnection=()=>{
    mongoose.connect("mongodb://localhost:27017/ecommerce").then(()=>{
        console.log("Database connected"); 
    }
    ).catch((err)=>{
        console.log(err);
    });
};
export default dbConnection;