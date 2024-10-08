import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const schema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isActivate:{
        type:Boolean,
        default:true
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
        lowercase:true
    },
    passwordChangedAt:Date,
    wishList:{
        type:[mongoose.Types.ObjectId],
        ref:"Product"
    },
    addresses:[
        {
            street:String,
            phone:String,
            city:String
        }
    ]
},{timestamps:true});
schema.pre("save",function(next){
    if(this.password) this.password=bcrypt.hashSync(this.password,8);
    next();
})
// hashing password before update
schema.pre('findOneAndUpdate',async function(next) {
    if (this._update.password) {
        this._update.password = bcrypt.hashSync(this._update.password,8);
        next()
    }
    next();
});
export const userModel=mongoose.model("User",schema);
