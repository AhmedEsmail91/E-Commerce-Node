import mongoose from "mongoose";
const schema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"Category name is already exist"],
        required:[true,"Category name is required"],
        trim:true,// as strip() in python
        minLength:[5,"Category name must be at least 5 characters"],
    },
    slug:{ // used in the URL to be user friendly url for SEO
        type:String,
        lowercase:true,
        required:[true,"Category slug is required"],
    },
    image:{// image path
        type:String
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"  
    }
},{timestamps:true});

export const categoryModel=mongoose.model("Category",schema);
