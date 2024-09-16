import bcrypt from "bcrypt"
import { userModel } from "../../databases/models/user.model.js"
import AppError from "../utils/AppError.js"

export const checkMail = async (req, res, next) => {

    let user = await userModel.findOne({ email: req.body.email })
    return user?next(new AppError("Email already exists",409)):next()
    
}