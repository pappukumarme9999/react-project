import mongoose from "mongoose";
const orderItemsSchema =new mongoose.Schema({
    orderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"order"
    },
    bookId : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"book"
    }
});

export const orderItems=mongoose.model("orderItem",orderItemsSchema);