import express from "express";
import multer from "multer";
import { signup, signIn, allUserList, userProfile, forgotPassword, updateProfile, verifyEmail, checkUser, updatePassword } from "../controller/user.controller.js";

const router=express.Router();
const upload = multer({dest:"public/images"});

router.post("/signup", upload.single("profile"), signup);
router.post("/verifyEmail",verifyEmail);
router.post("/signIn",signIn);
router.get("/userList",allUserList)
router.post("/viewprofile",userProfile );
router.post("/updateProfile",upload.single("profile"),updateProfile);
router.post('/forgotpassword',forgotPassword);
router.post('/updatepassword', updatePassword);
router.post('/checkuser',checkUser);
export default router;