import AppError from '../utils/AppError.js';
import { catchError } from './catchError.js';
// Signup validation function
const validation=(schema)=>{
    return async (req, res, next)=>{
    //generalize the input of the validation function to be the request body or the request params.
    const { error } = schema.validate({...req.params,...req.body,...req.query}, { abortEarly: false });
    if (error) {
        console.log(error.details);
        let errMsg=[];
        error.details.forEach(element => {
            errMsg.push(element.message);
        });
        console.log(errMsg.length)
        next(new AppError(errMsg, 400));
    } else {
        next();
    }
}  
};
export default validation; 