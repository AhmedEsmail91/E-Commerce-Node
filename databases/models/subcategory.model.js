import mongoose from "mongoose";
const schema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"SubCategory name is already exist"],
        required:[true,"SubCategory name is required"],
        trim:true, 
        minLength:[5,"SubCategory name must be at least 5 characters"],
    },
    slug:{  
        type:String,
        lowercase:true,
        required:[true,"SubCategory slug is required"],
    },
    image:{ 
        type:String
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"  
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"  
    }
},{timestamps:true});

export const subCategoryModel=mongoose.model("SubCategory",schema);
