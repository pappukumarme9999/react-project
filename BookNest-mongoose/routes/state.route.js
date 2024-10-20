import express from "express";
import { addState,stateList,addSingleState,deleteState } from "../controller/state.controller.js"
const router = express.Router();
router.post("/add-state", addState);
router.get("/findState",stateList);
router.get("/stateList",stateList);
router.post("/addSingleState",addSingleState);
router.get("/deleteState/:id",deleteState);

export default router;