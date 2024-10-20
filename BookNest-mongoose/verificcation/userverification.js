import { response } from "express";
import { Jwt } from "jsonwebtoken";

export default userVerifyToken = (request,response,next)=>{
    try{
    let token = request.headers.authorization;
    if(!token)
        throw new console.error(); 
     Jwt.verify(token,'zxcvbnmasdfghjkl');
     const encoded= jwt.decode(token);
    }catch(err){
        return response.status(401).json({err:"unautorized request",status:false});
    }
}