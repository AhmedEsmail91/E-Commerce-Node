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
// we can pass an array of hooks to the pre method to run this function on multiple hooks like "find", "findOne"
// schema.pre(['findOne','find'],function(){
//     this.populate('user','name -_id').populate('product','title -_id');
// })  
// or simply use RegEx:
schema.pre(/^find/,function(){
   this.populate('user','name -_id').populate('product','title _id');
})
export const reviewModel=mongoose.model("Review",schema);
