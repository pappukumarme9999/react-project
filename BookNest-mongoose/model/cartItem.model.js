import mongoose from "mongoose";
const cartItemsSchema =new mongoose.Schema({
    cartId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"cart"
    },
    bookId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"book"
    }
});

export const cartItems=mongoose.model("cartItem",cartItemsSchema);