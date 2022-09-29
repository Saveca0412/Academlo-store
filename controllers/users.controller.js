const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { User } = require("../models/user.models");
const { Order } = require("../models/order.models");
const { Product } = require("../models/product.models");
const { Cart } = require("../models/cart.model");

const { catchAsync } = require("../util/catchAsyncUtil");
const { appError } = require("../util/appError.util");

dotenv.config({ path: "./config.env" });

const createUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  newUser.password = undefined;
  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { username, email } = req.body;
  const { user } = req;
  await user.update({ username, email });
  user.password = undefined;
  res.status(200).json({
    status: "success",
    data: { user },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({ status: "deleted" });
  res.status(204).json({ status: "success" });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
    status: "active",
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new appError("Wrong credentials", 400));
  }
  user.password = undefined;
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({
    status: "success",
    data: { user, token },
  });
});
const getUserOrders = catchAsync(async (req, res, next) => {
  const { id } = req.sessionUser;
  const orders = await Order.findAll({
    where: { userId: id },
    include: [
      {
        model: Cart,
        include: [{ model: Product, where: { status: "purchased" } }],
      },
    ],
  });
  res.status(200).json({
    status: "success",
    data: { orders },
  });
});
const getOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.order;
  const order = await Order.findByPk(id);
  res.status(200).json({
    status: "success",
    data: { order },
  });
});

const getUserProducts = catchAsync(async (req, res, next) => {
  const { user } = req.sessionUser;
  const products = await Product.findAll({ where: { userId: user.id } });

  res.status(200).json({
    status: "success",
    data: { products },
  });
});

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  login,
  getUserOrders,
  getOrderById,
  getUserProducts,
};
