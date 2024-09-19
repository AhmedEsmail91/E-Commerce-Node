import mongoose from "mongoose";
const schema=new mongoose.Schema({
    code:{
        type:String,
        required:true,
        trim:true
    },
    discount:{
        type:Number,
        required:true
    },
    expires:{
        type:Date
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"  
    }
},{timestamps:true,toJSON:{virtuals:true}});
schema.virtual('carts',{
    ref:'Cart',
    localField:'_id',
    foreignField:'coupon'
});
schema.pre('findOne',function(){
    this.populate('carts','_id, carts');
})
export const couponModel=mongoose.model("Coupon",schema);
