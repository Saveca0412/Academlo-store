const express = require("express")
//Middlewares
const { protectSession } = require("../middlewares/auth.middlewares")
const { checkCart, checkProductQuantity, protectCartOwner, checkProdExistsInCart } = require("../middlewares/cart.middleware")

const { sendToCart, updateCart, removedProdCart,getAllProdInCart } = require("../controllers/cart.controller")


const cartRouter = express.Router()

cartRouter.use(protectSession)

cartRouter.post("/add-product",checkCart)//checkProdExistsInCart,checkProductQuantity,sendToCart
cartRouter.patch("/update-cart",protectCartOwner,checkProductQuantity, updateCart)
cartRouter.delete("/:productId",protectCartOwner,removedProdCart)
cartRouter.get("/purchase",protectCartOwner,getAllProdInCart)

module.exports = { cartRouter }
