import { userModel } from "../../../databases/models/user.model.js";
import { catchError } from "../../middlewares/catchError.js";
import AppError from "../../utils/AppError.js";
// $addToSet vs $push:
// $addToSet: Adds value to an array only if it is not already in the array.
// $push: Adds value to an array even if it is already in the array.
import { productModel } from "../../../databases/models/product.model.js";
const addToAddress = catchError(async (req, res) => {
    let address=await userModel
    .findByIdAndUpdate(req.user._id,{$addToSet:{addresses:req.body}},{new:true})
    !address && res.status(404).json({message:"Address not found"});
    address && res.status(200).json({message: "success", address:address.addresses});
})
const removeFromAddress = catchError(async (req, res) => {
    let addresses=await userModel.findById(req.user._id);
    let add=addresses.addresses.map(address=> address._id==req.params.id);
    if(add.length==0) throw new AppError("Address not found",404);
    else{
        let address=await userModel.findByIdAndUpdate(req.user._id,{$pull:{addresses:{_id:req.params.id}}},{new:true})
        res.status(200).json({message: "success", address:address.addresses});   
    }
})
const getLoggedUserAddresses = catchError(async (req, res) => {
    let address=await userModel.findById(req.user._id);
    !address && res.status(404).json({message:"Address not found"});
    address && res.status(200).json({message: "success", address:address.addresses});
});

export default {addToAddress,removeFromAddress,getLoggedUserAddresses};