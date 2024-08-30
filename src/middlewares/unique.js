import AppError from "../utils/AppError.js";

export default function unique(model,field){
    return async (req,res,next)=>{
        try{
            const value=req.body[field];
            const doc=await model.findOne({field:value});
            if (doc) {
                return next(AppError(`${field} already exists`,401));
            }
        }
        catch(err){
            next(AppError(err.message,401));
        }
    }
}