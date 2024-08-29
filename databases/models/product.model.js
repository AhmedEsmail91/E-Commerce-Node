import mongoose from "mongoose";
import conn from "../dbConnection.js";
import { MAX } from "uuid";
const schema=new mongoose.Schema({
    title:{
        type:String,
        unique:[true,"Product name is already exist"],
        required:[true,"Product name is required"],
        trim:true, 
        minLength:[5,"Product name must be at least 5 characters"],
        maxLength:[200,"Product name must be at most 200 characters"],
    },
    slug:{  
        type:String,
        lowercase:true,
        required:[true,"Product slug is required"],
    },
    description:{
        type:String,
        required:[true,"Product description is required"],
        trim:true,
        minLength:[20,"Product description must be at least 20 characters"],
        maxLength:[1000,"Product description must be at most 1000 characters"],
    },
    imgCover:{
        type:String
    },
    images:{
        type:[String],
        required:[true,"Product images is required"],
        minLength:[2,"Product images must be at least 2 images"],
        maxLength:[,"Product images must be at most 6 images"]
    },
    price:{
        type:Number,
        required:[true,"Product price is required"],
        min:[0,"Product price must be at least 0"],
    },
    priceAfterDiscount:{
        type:Number,
        required:true,
        min:[0,"Product price after discount must be at least 0"],
    },
    quantity:{
        type:Number,
        min:0,
        default:0
    },
    sold:{
        type:Number
    },
    rateAvg:{
        type:Number,
        max:5,
        min:0
    },
    rateCount:{
        type:Number
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"  
    },
    subCategory:{
        type:mongoose.Types.ObjectId,
        ref:"SubCategory"  
    },
    brandId:{
        type:mongoose.Types.ObjectId,
        ref:"Brand"  
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"  
    }
},{timestamps:true});

export const productModel=mongoose.model("Product",schema);
