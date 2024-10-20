import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
const userSchema =new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim : true
    },
    email:{
        type:String,
        required:true,
        unique : true,
        trim : true
    },
    password: {
        type:String,
        required:true,
        unique : true,
        trim : true
    },
    contact: {
        type: Number,
        required:true,
        trim : true
    },
    photo: {
        type: String,
        trim : true,
  
    },
    status: {
        type:Boolean,
        default:true
    },
    gender : {
        type : String,
        trim : true,
    }
})
userSchema.plugin(uniqueValidator);
export const User = mongoose.model("user",userSchema);