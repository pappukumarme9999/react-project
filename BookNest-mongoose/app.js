import bodyParser from "body-parser";
import express from "express";
import userRoute from "./routes/user.route.js"
import stateRouter from "./routes/state.route.js"
import cityRouter from "./routes/city.route.js"
import BookRoute  from "./routes/book.route.js"
import CategoryRoute from "./routes/category.route.js";
import AdminRouter from "./routes/admin.route.js"
import CartRouter from "./routes/cart.route.js"
import OrderRoute from "./routes/order.route.js"
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import path from "path";
dotenv.config();
const app = express();
mongoose.connect(process.env.MONGO_URL).then();
app.use(bodyParser.json()); 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname,"public")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/user",userRoute);
app.use("/state",stateRouter);
app.use("/city",cityRouter);
app.use("/book",BookRoute);
app.use("/category",CategoryRoute);
app.use("/admin",AdminRouter)
app.use("/cart",CartRouter);
app.use("/order",OrderRoute);
app.listen(process.env.PORT,()=>{
})