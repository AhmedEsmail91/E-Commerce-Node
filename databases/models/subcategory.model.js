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
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category"  
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"  
    }
},{timestamps:true});

schema.pre("find",function(next){
    this.populate("category");
    next();
})
export const subCategoryModel=mongoose.model("SubCategory",schema);
