import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    billamount:{
        type:Number,
        required:true
    },
    contactPerson:{
        type:String,
        required:true
    },
    contactNumber:{
        type:Number,
        required:true,
        trim:true
    },
    delieveryAddress:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    },
    paymentMode:{
        type:Number,
        default:"Cash On Delievery"
    },
    date:{
       type:String,
   
    },
    orderItem:[
        {
            bookId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"book"
            }
        }
    ]

})

export const Order = mongoose.model("order",orderSchema)