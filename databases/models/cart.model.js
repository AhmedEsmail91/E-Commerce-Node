import mongoose from "mongoose";
const schema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    cartItems:[
        {
            product:{type:mongoose.Types.ObjectId,ref:"Product",required:true},
            quantity:{type:Number,default:1,required:true},
            price:{type:Number,required:true}
        }
    ],
    totalPrice:{
        type:Number,
        required:true
    },
    totalPriceAfterDiscount:{
        type:Number,
        required:true
    },
    // Discount for coupon.
    discount:{
        type:Number,
        
    },
    coupon:{
        type:mongoose.Types.ObjectId,
        ref:"Coupon"
    }
},{timestamps:true});
schema.pre('findAndUpdate',function(){
    this.totalPrice = this.cartItems.reduce((acc,curr)=>acc+curr.price,0);
    this.totalPriceAfterDiscount = this.totalPrice - this.discount;
})
export const cartModel=mongoose.model("Cart",schema);
