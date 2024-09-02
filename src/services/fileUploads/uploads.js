import multer from 'multer';
import {v4 as uuidv4} from 'uuid'; 
import AppError from './../../utils/AppError.js';

export const fileUpload=()=>{
  //---------------Storage----------------
  const storage=multer.diskStorage({
      destination:(req,file,cb)=>{
        cb(null,'uploads/');
      },
      filename:(req,file,cb)=>{
        cb(null,uuidv4()+'-'+file.originalname);
      }
    })
  //-------------------File Filter-----------------
  function fileFilter(req,file,cb){
    // if(file.mimetype.startsWith("image"))cb(null,true);
    // else cb(new AppError('File Type Not Supported',400),false);
    cb(null,true);
  }

  return multer({ dest: 'uploads/',storage:storage ,fileFilter:fileFilter})
}
const uploadSingleFile=fieldName=>fileUpload().single(fieldName);
const uploadArrayOfFiles=fieldName=>fileUpload().array(fieldName,10);
const uploadFields=fields=>fileUpload().fields(fields);

export default {uploadSingleFile,uploadArrayOfFiles,uploadFields};