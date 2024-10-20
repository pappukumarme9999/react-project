import express from "express";
import {addCategory,editCategory,list,removeCategory,addMoreCategory}from "../controller/category.controller.js"
const router = express.Router();
router.post("/addCategory",addCategory);
router.get("/list",list);
router.post("/remove",removeCategory);
router.post("/edit",editCategory )
router.post("/add",addMoreCategory)
export default router;