import mongoose from "mongoose";
const schema=new mongoose.Schema({
    name:{
        type:String,
        unique:[true,"Brand name is already exist"],
        required:[true,"Brand name is required"],
        trim:true,
        minLength:[5,"Brand name must be at least 5 characters"],
    },
    slug:{  
        type:String,
        lowercase:true,
        required:[true,"Brand slug is required"],
    },
    logo:{ 
        type:String
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"user"  
    }
},{timestamps:true});

export const brandModel=mongoose.model("Brand",schema);
