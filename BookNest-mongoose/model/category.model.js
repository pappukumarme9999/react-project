import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

const CategorySchema =new mongoose.Schema({
    categoryName: {
        type: String,
        required : true,
        unique : true
    }
});
CategorySchema.plugin(uniqueValidator);
export const Category=mongoose.model("category",CategorySchema);