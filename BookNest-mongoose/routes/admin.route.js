import express from "express";
import{body }from "express-validator";
import { signUp ,signIn} from "../controller/admin.controller.js";
const router=express.Router();

router.post("/signup",body("name","Name Must Be Required").notEmpty(),
body("password","password Must Be Required").notEmpty(),
body("contact","contact Must Be Required").notEmpty(),
body("email","Email Must be Required"),body("email","please Enter correct email"),signUp);

router.post("/signIn",signIn);



export default router;