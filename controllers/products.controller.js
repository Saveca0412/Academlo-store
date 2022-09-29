const { Product } = require("../models/product.models");
const { Category } = require("../models/category.models");

const { catchAsync } = require("../util/catchAsyncUtil");
const { appError } = require("../util/appError.util");

const createProduct = catchAsync(async (req, res, next) => {
  const { title, description, price, categoryId, quantity } = req.body;
  const { id } = req.sessionUser;

  const newProduct = await Product.create({
    title,
    description,
    price,
    categoryId,
    quantity,
    userId: id,
  });
  res.status(201).json({
    status: "success",
    data: { newProduct },
  });
});

const getAllProduct = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: { status: "active" },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.status(200).json({
    status: "success",
    data: { products },
  });
});

const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.Product;
  const product = await Product.findByPk(id);

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { title, description, price, quantity } = req.body;
  const { product } = req;
  await product.update({ title, description, price, quantity });

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  await product.update({ status: "deleted" });

  res.status(204).json({
    status: "success",
  });
});

const getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.findAll({
    where: { status: "active" },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  res.status(200).json({
    status: "success",
    data: { categories },
  });
});

const addCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  res.status(201).json({
    status: "success",
    data: { category },
  });
});

const updateCategory = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { category } = req;

  await category.update({ name });
  res.status(200).json({
    status: "success",
    data: { category },
  });
});

module.exports = {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllCategories,
  addCategory,
  updateCategory,
};
