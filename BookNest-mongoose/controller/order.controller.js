import { request, response } from "express";
import { Cart } from "../model/cart.model.js";
import { Order } from "../model/order.model.js";
export const saveOrder = (request, response, next) => {
    Order.create({
        userId: request.body.userId, cartId: request.body.cartId, billamount: request.body.billamount, contactPerson: request.body.contactPerson, contactNumber: request.body.contactNumber,date:request.body.date,
        delieveryAddress: request.body.delieveryAddress, status: request.body.status, paymentMode: request.body.paymentMode, 
        orderItem: request.body.orderItem
    }).then((result) => {
        Cart.findOne({ userId: request.body.userId}).then(orderResult => {
            orderResult.deleteOne().then(deleteResult => {
                return response.status(200).json({ orderId : result._id,message: "Order Placed SuccesFully", status: true });
            });
           return response.status(200).json({ orderId : result._id,message: "Order Placed SuccesFully", status: true });
        }).catch(err => {
            return response.status(500).json({ msg: "Internal Server Error", status: false })
        })

    }).catch((err) => {
        return response.status(500).json({ err: "Internal Server Error", status: false })
    })
}


export const vieworderList = (request, response, next) => {
    Order.find().then(result => {
        return response.status(200).json({ msg: "All Orders List", orderlist: result, status: true });
    }).catch(err => {
        return response.status(500).json({ err: "Internal Server Error", status: false });
    })
}

export const vieworderHistoryByUserId = (request, response, next) => {
    Order.find({userId: request.body.userId }).then(result => {
       
        return response.status(200).json({ msg: " Your All Orders ", orderlist: result, status: true });
    }).catch(err => {
        return response.status(500).json({ err: "Internal Server Error", status: false });
    })
}


export const vieworderByorderId = (request, response, next) => {
   
    Order.findById(request.body.id).populate({
        path:"orderItem",
        populate:{path:"bookId"}
    }).then((result) => {
        return response.status(200).json({ order: result, status: true });
    }).catch((err) => {
        return response.status(500).json({ err: "Internal Server Error", status: false });
    })
}


export const changestatus = async (request, response, next) => {
    try {
        let order = await Order.findById(request.params.orderId)
        if (!order)
            return response.status(401).json({ message: "Order ID nor found" })
        if (order.status == "shipped")
            return response.status(200).json({ status: "Order has already shipped" })
        order = await Order.findByIdAndUpdate(
            request.params.orderId,
            {
                status: "shipped"
            }, { new: true }
        )
        return response.status(200).json({ Order: order, status: true })
    }
    catch (err) {
        return response.status(500).json({ error: "Internal Server Error" })
 }
}
export const viewOrderBySellerId = (request, response, next) => {
    Order.find({ sellerId: request.body.sellerId }).then((result) => {
        return response.status(200).json({ result: result, status: true });
    }).catch((err) => {
        return response.status(500).json({ msg: "Internal Server Eror", status: false });
    })
}