const express = require("express");

const { protectSession } = require("../middlewares/authMiddlewares");

const { sendToCart, updateCart } = require("../controllers/cart.controller");

const cartRouter = express.Router();

cartRouter.post("/add-product", sendToCart);
cartRouter.post("purchase");
cartRouter.patch("/update-cart", updateCart);
cartRouter.delete("/:productId");

module.exports = { cartRouter };
