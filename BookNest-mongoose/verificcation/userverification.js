import jwt from "jsonwebtoken"; // Fix import
const userVerifyToken = (request, response, next) => {
    try {
        let token = request.headers.authorization;
        if (!token) {
            console.error("No token provided");
            return response.status(401).json({ err: "Unauthorized request", status: false });
        }
        const decoded = jwt.verify(token, process.env.KEY_SECRET || 'zxcvbnmasdfghjkl');
        request.user = decoded;
        next();
    } catch (err) {
        console.error("Unauthorized request:", err);
        return response.status(401).json({ err: "Unauthorized request", status: false });
    }
};
export default userVerifyToken;
