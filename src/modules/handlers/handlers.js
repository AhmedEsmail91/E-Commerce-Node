import { catchError } from "../../middlewares/catchError.js"

export const deleteOne=(model)=>{
    return catchError(async(req,res,next)=>{
        const Document = await model.findByIdAndDelete(req.params.id,{new:true});
        !Document && res.status(404).json({message:"Document not found"});
        Document && res.status(200).json({message: "success", Document:Document});
    })
}