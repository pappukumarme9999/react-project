import { validationResult } from "express-validator";
import {Admin} from "../model/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp=async(request,response,next)=>{
    try{
   !(validationResult(request))?response.status(400).json({err:"Bad Request",status:false}):request.body.password =await bcrypt.hash(request.body.password,await bcrypt.genSalt(13));
   let admin = await Admin.create(request.body);
   return  response.status(200).json({result:admin,msg:"SignUp success",status:true })
    }catch(err){
        return response.status(500).json({err:"Internal Server Error",status:false});
    }
}


export const signIn =async(request,response,next)=>{
    try{
    let admin =await Admin.findOne({email:request.body.email});
    let status=admin?await bcrypt.compare(request.body.password,admin.password):response.status(401).json({msg:"Unauthorized person",status:false});
    if(status){
      let token=jwt.sign({email:admin.email},'aqwertylkjhgfdsdfghj');
         return response.status(200).json({admin:{...admin.toObject(),password:undefined},msg:"SignIn Success",status:true,token:token});
    }
    return response.status(401).json({err:"Unauthorized Person",status:false});  

    }catch(err){
        return response.status(500).json({err:"Internal Server Error",status:false});
    }
}