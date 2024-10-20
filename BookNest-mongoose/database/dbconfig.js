import mongoose from "mongoose";
mongoose.connect("mongodb+srv://rathorechetna03:chetna22@cluster0.kfb0xej.mongodb.net/Book?retryWrites=true&w=majority").then((result)=>{
    console.log("Connected to MongoDB");

}).catch(err=>{
})

export default mongoose.connection;