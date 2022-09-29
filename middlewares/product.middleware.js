const { Category } = require("../models/category.models");
const { Product } = require("../models/product.models");
const { appError } = require("../util/appError.util");
const { catchAsync } = require("../util/catchAsyncUtil");

const checkProductExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOne({ where: id });

  if (!product) {
    return next(new appError("product not found", 404));
  }
  req.product = product;
});

const checkProductOwner = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { id } = req.sessionUser;

  if (product.userId !== id) {
    return next(new appError("You're not creator of this product", 403));
  }
});

const checkCategoryExists = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findOne({ where: id });

  if (!category) {
    return next(new appError("category not found", 404));
  }
  req.category = category;
});

module.exports = { checkProductExists, checkProductOwner, checkCategoryExists };
