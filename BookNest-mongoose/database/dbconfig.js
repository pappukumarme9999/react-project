// import mongoose from "mongoose";
// // mongoose.connect("mongodb+srv://rathorechetna03:chetna22@cluster0.kfb0xej.mongodb.net/Book?retryWrites=true&w=majority").then((result)=>{
// mongoose.connect("mongodb+srv://pappukumarme9999:Pappu@9999@clusterbooknest.jrcon.mongodb.net/BookNestDB?retryWrites=true&w=majority&appName=clusterBooknest").then((result)=>{
//     console.log("Connected to MongoDB");

// }).catch(err=>{
// })

// export default mongoose.connection;



import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); 
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));
export default mongoose;
