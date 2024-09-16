import AppError from '../utils/AppError.js';
import { catchError } from './catchError.js';
// Signup validation function
const validation=(schema)=>{
    return async (req, res, next)=>{
    //generalize the input of the validation function to be the request body or the request params.
    let filter={};
    if(req.file){
        filter={image:req.file,...req.body,...req.params,...req.query};
        console.log({file:true,fields:filter})
    }
    else if(req.files){
        filter={...req.files,...req.body,...req.params,...req.query};
        console.log({files:true,fields:filter})
    }
    else{
        filter={...req.body,...req.params,...req.query};
        console.log({raw:true,fields:filter})
    }
    const {error} = await schema.validate(filter, { abortEarly: false });

    if (error) {
        console.log(error.details);
        let errMsg=[];
        error.details.forEach(element => {
            errMsg.push(element.message);
        });
        // console.log(errMsg.length)
        next(new AppError(errMsg, 400));
    } else {
        next();
    }
}  
};
export default validation; 