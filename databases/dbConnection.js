import mongoose from "mongoose";
// username:ahmedesmail9102
// password:jP1gCvm36IpBRD19
import chalk from 'chalk';
const dbConnection=()=>{
    mongoose.connect("mongodb+srv://ahmedesmail9102:jP1gCvm36IpBRD19@cluster0.0omyp.mongodb.net/ecommerce").then(()=>{
        console.log(chalk.blue.italic("Database connected successfully")); 
    }
    ).catch((err)=>{
        console.log(err);
    });
};
export default dbConnection; 