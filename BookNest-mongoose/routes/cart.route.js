import express from "express";
import {addToCart, fetchCart,removeBookInCart,userCart} from "../controller/cart.controller.js"
import {verifyToken} from '../verification/tokenVerification.js';
const router=express.Router();
router.post("/addToCart",addToCart);
router.post("/fetchCart",fetchCart);
router.post("/remove",removeBookInCart);
// router.post("/userCart",userCart);
export default router;