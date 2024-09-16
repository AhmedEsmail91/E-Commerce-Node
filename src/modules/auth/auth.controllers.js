import { userModel } from "../../../databases/models/user.model.js"
// import { emailHtml } from "../../emails/emailTemplate.js"
// import { sendMail } from "../../emails/sendEmail.js" 
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
import { catchError } from "../../middlewares/catchError.js"
import AppError from "../../utils/AppError.js";



const signup = catchError(async (req, res, next) => {
        let user= new userModel(req.body)
        await user.save();
        let token = jwt.sign({ userId: user._id ,role:user.role}, process.env.JWT_SECRET_KEY)
        // sendMail({ email: req.body.email, html: emailHtml(token) })
        res.json({ message: "success",token })

})

const signin = catchError(async (req, res,next) => {
    let user = await userModel.findOne({ email: req.body.email })

    if (user && bcrypt.compareSync(req.body.password,user.password,8)) {
        //Assign a token to the user
        let token = jwt.sign({ userId: user._id ,role:user.role}, process.env.JWT_SECRET_KEY)
        res.json({ message: "success", token })
    }
    else{
        next(new AppError("Invalid email or password", 401))
    }
})
// after login change the password
const changePassword = catchError(async (req, res,next) => {

    
    let user = await userModel.findById(req.user._id);
    
    if (user && bcrypt.compareSync(req.body.password,user.password,8)) {
        // Regenerate the token
        let token = jwt.sign({ userId: user._id ,role:user.role}, process.env.JWT_SECRET_KEY);
        // Hash the new password
        let newPassword=req.body.newPassword;
        // Update the password in the database
        await userModel.findByIdAndUpdate(req.user._id,{password:newPassword,passwordChangedAt:Date.now()});
        res.json({ message: "success", token })
    }
    else{
        next(new AppError("Invalid old password", 401))
    }
})

// Authentication
const protectedRoute = catchError(async (req, res, next) => {
    // 1- Get the token from the header
    // 2- Verify the token
    // 3- Get the user from the database (Exist or not)
    // 4- Incase of reset password or delete account, check the token is still valid using Issued at time (Iat)
    //----------------------------Action----------------------------
    // 1st Step
    
    let token=req.headers.token
    if(!token) return (next(new AppError("Please login first",401)));
    // 2nd Step
    
    let decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    let user=await userModel.findById(decoded.userId)
    if(!user) return (next(new AppError("User not found",401)));
    if(user.passwordChangedAt){
        let timeChanged=parseInt(user.passwordChangedAt.getTime()/1000);
        if(timeChanged>decoded.iat) return (next(new AppError("Token is invalid... login again",401)));
    }
    req.user=user;
    return next();
});

const allowedTo=(...roles)=>{
    return catchError(
        async (req,res,next)=>{
            let currentUserRole=req.user.role;
            if(!roles.includes(currentUserRole)){
                return next(new AppError("You are not allowed to access this route",403));
            }
            next();
        }
    )
}
export {
    signup, 
    signin,
    changePassword,
    protectedRoute,
    allowedTo
}