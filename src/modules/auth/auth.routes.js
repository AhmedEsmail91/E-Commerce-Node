


import express from "express"
import validation from "../../middlewares/validation.js"
import { checkMail } from "../../middlewares/checkMail.js"
import { signin, signup,protectedRoute, changePassword } from "./auth.controllers.js"
import { signinSchemaVal, signupSchemaVal } from "./auth.validation.js"


const authRouter = express.Router()

authRouter.post('/signup', validation(signupSchemaVal),checkMail, signup)
authRouter.post('/signin', validation(signinSchemaVal) ,signin)
authRouter.patch('/changePassword',protectedRoute,changePassword)
// authRouter.post('/protected',protectedRoute)


export default authRouter