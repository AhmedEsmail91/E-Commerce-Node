import nodemailer from "nodemailer";
import {orderEmail} from "./orderDetailsEmail.js";
export const sendEmail =async(sendToEmail,products)=>{
    

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const info=await transporter.sendMail({
        from: '"Node JS Sara7a App"<eng.ahmed.esmail.19@gmail.com>',
        to: sendToEmail.email,
        subject: "Hello",
        // text: "Hello world?",
        // html: emailTemplate(url,name)
        html:orderEmail(sendEmail.name,products)
    });
    console.log("Message sent: %s", info.messageId);
};