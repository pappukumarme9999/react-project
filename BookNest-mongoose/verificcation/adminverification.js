import { response } from "express";
import jwt from "jsonwebtoken"

export const AdminverifyToken=(request,response,next)=>{
    try{
    let token=request.headers.authorization;
     if(!token)
       throw new console.error();
       jwt.verify(token,'aqwertylkjhgfdsdfghj');
     
       next();
    }catch(err){
        return response.status(401).json({err:"unautorized request",status:false});
    }
}