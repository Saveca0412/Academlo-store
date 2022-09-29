const { Cart } = require("../models/cart.model");
const { ProductsInCart } = require("../models/productsInCart.models");

const { catchAsync } = require("../util/catchAsyncUtil");
const { appError } = require("../util/appError.util");

const sendToCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const product = await ProductsInCart.create({ productId, quantity });

  res.status(201).json({
    status: "success",
    data: { product },
  });
});

const updateCart = catchAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const g = Cart.findOne(productId);

  const cart = await Cart.update({ quantity });

  res.status(201).json({
    status: "success",
    data: { cart },
  });
});
module.exports = { sendToCart };
