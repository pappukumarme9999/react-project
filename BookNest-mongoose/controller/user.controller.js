import { validationResult } from "express-validator";
import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendMail from '../services/email.js';
dotenv.config();

export const verifyEmail = async (req, res, next) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists.", status: false });
        }

        const otp = Math.floor(1000 + Math.random() * 9000); // Generate OTP
        const emailSent = await sendMail(req.body.email, "Email Verification", `Your OTP is: ${otp}`);
        if (!emailSent) {
            console.log("Error sending email");
            return res.status(500).json({ message: "Error sending email", status: false });
        }

        console.log("OTP sent successfully");
        return res.status(200).json({ otp, expiresIn: 5 * 60, status: true });
    } catch (err) {
        console.error("Verification Error:", err);
        return res.status(500).json({ message: "Internal server error", status: false });
    }
};

export const signup = async (req, res, next) => {
    try {
        console.log("Received signup request:", req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation errors:", errors.array());
            return res.status(400).json({ message: "Invalid data", errors: errors.array() });
        }

        req.body.password = await bcrypt.hash(req.body.password, 12);
        const newUser = await User.create(req.body);

        console.log("User registered:", newUser);
        return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error("Signup Error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const signIn = async (request, response, next) => {
    try {
        let user = await User.findOne({ email: request.body.email });
        let status = user?.email ? await bcrypt.compare(request.body.password, user.password) : false;
        if (status) {
            let token = jwt.sign({ email: user.email,password:user.password,name:user.name}, process.env.KEY_SECRET);
            return response.status(200).json({ user: { ...user.toObject(), password: null }, msg: "SignIn Success", status: true, token: token });
        }
        return response.status(404).json({ err: "unauthorized person" })

    } catch (err) {
        return response.status(200).json({ err: "Internal Server Error", status: false });
    }
};

export const allUserList = (request, response, next) => {
    User.find().then(result => {
        return response.status(200).json({ msg: "All User List", user: result, status: true });
    }).catch(err => {
        return response.status(500).json({ err: "Internal Server Error", status: false });
    })
}

export const userProfile = async (request, response, next) => {
    try {
        let user = await User.findById(request.body.id);
        user ? response.status(200).json({ Details: { ...user.toObject(), password: undefined }, status: true }) : response.status(400).json({ Message: "Bad request", status: false });
    }
    catch (err) {
        return response.status(500).json({ Message: "Internal Server Error...", status: false });
    }
}

export const updateProfile = async (req,response,next)=>{
   try{
   const user = await User.findById(req.body._id);
   if (user) {
       user.name = req.body.name || user.name;
       user.contact = req.body.contact || user.contact;
       user.photo = "BookNest@"+req.file.filename || user.photo;
      
       const updatedUser = await user.save();
       return response.status(200).json({updatedUser:updatedUser,staus:true});
   }
}
   catch(err){
    return response.status(500).json({error : "Internal server error"});
  }
}

export const forgotPassword = async (request, response, next) => {
    try {
        const { email } = request.body;
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(404).json({ message: 'User not found' });
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        response.json({ message: 'Password reset email sent' });
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Server error' });
    }
};

export const checkUser = async (request, response, next) => {
    try {
        function generateOTP() {
            var digits = "0123456789";
            let OTP = "";
            for (let i = 0; i < 4; i++) {
                OTP += digits[Math.floor(Math.random() * 10)];
            }
            return OTP;
        };
        const data = await User.findOne({ email: request.body.email });
        const OTP = await generateOTP();
        let email = mail(request.body.email, "Forgott Password change related", data?.name, OTP);
        if (!email)
            return response.status(200).json({ user: data, otp: OTP, status: true });
        return response.status(400).json({ Message: "User is unauthorized", status: false });
    }
    catch (err) {
        return response.status(500). json({ message: 'Internal server error...', status: false });
    }
}

export const updatePassword = async (request, response, next) => {
    try {
        request.body.password = await bcrypt.hash(request.body.password, await bcrypt.genSalt(15));
        const user = await User.findOneAndUpdate({ email: request.body.email }, { password: request.body.password });
        if (user?.status)
            return response.status(200).json({ Message: 'Password Updated success', status: true });
        return response.status(400).json({ Message: 'Unauthorized User...', status: false });
    }
    catch (err) {
        return response.status(500).json({ Message: 'Internal Server Error...', status: false });
    }
}