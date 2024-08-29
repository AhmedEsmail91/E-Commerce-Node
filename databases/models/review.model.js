import mongoose from "mongoose";
const schema=new mongoose.Schema({
    text:{
        type:String,
        trim:true,
        minLength:[10,"Review text must be at least 10 characters"],
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:"Product"
    },
    rate:{
        type:Number,
        min:0,
        max:5
    }
},{timestamps:true});

export const reviewModel=mongoose.model("Review",schema);
