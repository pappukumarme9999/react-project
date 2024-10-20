import jwt from 'jsonwebtoken';
export const verifyToken = async (request,response,next)=>{
    try{
        let token = request.headers.authorization;
    if(!token)
        throw new Error();
    jwt.verify(token,process.env.KEY_SECRET);
    next();
    }catch(err){
        return response.status(401).json({message : 'Un-authorized user',status:false});
    }
}