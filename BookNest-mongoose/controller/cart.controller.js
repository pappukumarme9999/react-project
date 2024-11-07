import { request, response } from "express";
import { Cart } from "../model/cart.model.js"
export const addToCart = async (request, response, next) => {
  try {
    let cart = await Cart.findOne({ userId: request.body.userId });
    if (cart) {
      if (cart.cartItems.some((item) => item.bookId == request.body.bookId))
        return response.status(400).json({ message: "Book Already Exist In Cart" });
      cart.cartItems.push({ bookId: request.body.bookId });

      let savecart = await cart.save();
      return response.status(200).json({ message: "Item Added  SuccesFully In Cart" });
    } else {
      let savecart = await Cart.create({
        userId: request.body.userId,
        cartItems: [{ bookId: request.body.bookId }]
      });
      response.status(200).json({ msg: "Book Added SuccesFully In Cart", status: true })
    }

  } catch (err) {
   
    return response.status(500).json({ msg: "Inernal Server Error", status: false });
  }
}

export const fetchCart = (request, response, next) => {
  Cart.find({ userId: request.body.userId }).populate("cartItems.bookId").then(result => {
    return response.status(200).json({ cart: result[0].cartItems, status: true });
  }).catch(err => {
   
    return response.status(200).json({ msg: "Inernal Server Error", status: false });
  })
}


export const removeBookInCart = async (request, response, next) => {  
try {
  let cart = await Cart.findOne({ userId: request.body.userId })
 
  if (cart) {
    let cartItemList = cart.cartItems;
    let index = cartItemList.findIndex((item) => item._id == request.body._id)
    if (index != -1) {
      cart.cartItems.splice(index, 1)
      cart.save();
      cart = await cart.populate('cartItems.bookId');
      return response.status(200).json({ message: "book removed in cart", status: true ,cart})
    }
    else {
      return response.status(400).json({ error: "not found", status: false });
    }
  }
  else {
    return response.status(400).json({ error: "Bad request", status: false });
  }
}
catch (err) {
  
  return response.status(500).json({ message: "Internal server error", status: false });
  }
}


export const userCart = async (request, response, next) => {
  try {
    let data = await Cart.findOne({ userId: request.body.userId }).populate("cartItems.bookId");
    return response.status(200).json({ result: data, status: true });
  } catch (err) {
 
    return response.status(500).json({ Message: "Internal Server Error...", status: false });
  }
}