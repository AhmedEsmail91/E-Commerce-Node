
import slugify from "slugify";
import { userModel } from "../../../databases/models/user.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";

const addUser = catchError(async (req, res) => {
    let User= new userModel(req.body);
    await User.save();
    res.status(201).json({ message: "success", User:{name:User.name,email:User.email} });
})

const getAllUsers = catchError(async (req, res) => {
    const apiFeatures = new ApiFeatures(userModel.find(), req.query);
    apiFeatures.pagination(10).filtration().sort().fields().search();
    let users = await apiFeatures.mongooseQuery;

    !(users.length>=1) && res.status(404).json({message:"User not found"});
    (users.length >=1) && res.status(200).json({message: "success",page:apiFeatures.pageNum,User:users});
})

const getSingleUser = catchError(async (req, res) => {
    const User = await userModel.findById(req.params.id);
    !User && res.status(404).json({message:"User not found"});
    User && res.status(200).json({message: "success", User:User});
})

const updateUser = catchError(async (req, res) => {
     
    req.file && (req.body.image = req.file.filename);

    const User = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    !User && res.status(404).json({message:"User not found"});
    User && res.status(200).json({message: "success", User:User});
    
})
const deleteUser = deleteOne(userModel);

export default {addUser,getAllUsers,getSingleUser,updateUser,deleteUser};