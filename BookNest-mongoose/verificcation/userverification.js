import { jwt } from "jsonwebtoken";

const userVerifyToken = (request,response,next)=>{
    try{
    let token = request.headers.authorization;
    if(!token)
        throw new console.error("No token provided"); 
    const decoded = jwt.verify(token, process.env.KEY_SECRET || 'zxcvbnmasdfghjkl');
    request.user = decoded;
    next(); 
    }catch(err){
        console.error("Unauthorized request:", err);
        return response.status(401).json({err:"unautorized request",status:false});
    }
};
export default userVerifyToken;