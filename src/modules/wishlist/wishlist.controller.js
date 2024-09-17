import { userModel } from "../../../databases/models/user.model.js";
import { catchError } from "../../middlewares/catchError.js";
import AppError from "../../utils/AppError.js";
// $addToSet vs $push:
// $addToSet: Adds value to an array only if it is not already in the array.
// $push: Adds value to an array even if it is already in the array.
import { productModel } from "../../../databases/models/product.model.js";
const addToWishlist = catchError(async (req, res) => {
    let product=await productModel.findById(req.body.product);
    if(!product) throw new AppError("Product not found",404);
    else{
        let Wishlist=await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{wishList:req.body.product}},{new:true}).populate("wishList");
        !Wishlist && res.status(404).json({message:"Wishlist not found"});
        Wishlist && res.status(200).json({message: "success", Wishlist:Wishlist.wishList});
    }
})
const removeFromWishlist = catchError(async (req, res) => {
    let product=await productModel.findById(req.params.id);
    // console.log(product);
    if(!product) throw new AppError("Product not found",404);
    else{
        let isProductExist=await userModel.findOne({_id:req.user._id,wishList:req.params.id});
        if(!isProductExist){return res.status(404).json({message:"Product not found in Wishlist"})}
        let Wishlist=await userModel.findByIdAndUpdate(req.user._id,{$pull:{wishList:req.params.id}},{new:true});
        !Wishlist && res.status(404).json({message:"Wishlist not found"});
        Wishlist && res.status(200).json({message: "success", Wishlist:Wishlist});  
    }
})
const getUserWishlist = catchError(async (req, res) => {
    let Wishlist=await userModel.findById(req.user._id).populate("wishList");
    // console.log(Wishlist);
    !Wishlist && res.status(404).json({message:"Wishlist not found"});
    Wishlist && res.status(200).json({message: "success", Wishlist:Wishlist.wishList});
});

export default {addToWishlist,removeFromWishlist,getUserWishlist};