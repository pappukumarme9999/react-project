import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
const AdminSchema =new mongoose.Schema({
    name: {
        type: String,
       required:true,
       trim : true,
    },
    email: {
        type: String,
        required:true,
        trim:true,
        unique : true
    },
    password: {
        type: String,
        required:true,
        unique : true,
        trim : true
    },
    contact: {
        type: String,
        required:true,
        trim : true
    },

});
AdminSchema.plugin(uniqueValidator);
export const Admin=mongoose.model("admin",AdminSchema);