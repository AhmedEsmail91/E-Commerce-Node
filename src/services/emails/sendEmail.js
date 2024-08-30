import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { emailTemplete } from "./emailTemplete.js";
export const sendEmail =async(token,sendtoEmail)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const url=`http://localhost:3000/api/verifyEmail/${token}`;

    const name=jwt.verify(token,process.env.JWT_SECRET,token).name;
    const info=await transporter.sendMail({
        from: '"Node JS Sara7a App"<eng.ahmed.esmail.19@gmail.com>',
        to: sendtoEmail,
        subject: "Hello",
        // text: "Hello world?",
        html: emailTemplete(url,name)
    });
    console.log("Message sent: %s", info.messageId);
};