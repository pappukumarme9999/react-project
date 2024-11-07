import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
const CartSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"   
    },
    cartItems:[{
        bookId : {
            type : mongoose.Schema.Types.ObjectId,
            ref:"book"
        }
    }]
});

export const Cart =mongoose.model("cart",CartSchema);