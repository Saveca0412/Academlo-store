const express = require("express");

const { protectSession } = require("../middlewares/authMiddlewares");

const {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProduct,
  updateProduct,
  getAllCategories,
  addCategory,
  updateCategory,
} = require("../controllers/products.controller");
const {
  checkProductExists,
  checkProductOwner,
  checkCategoryExists,
} = require("../middlewares/product.middleware");
const {
  validateDataProduct,
} = require("../middlewares/validators.middlewares");

const productRouter = express.Router();

productRouter.get("/", getAllProduct);

productRouter.get("/:id", checkProductExists, getProductById);

productRouter.get("/categories", getAllCategories);

productRouter.use(protectSession);

productRouter.post("/", validateDataProduct, createProduct);

productRouter.post("/categories", addCategory);

productRouter.patch(
  "/:id",
  checkProductExists,
  checkProductOwner,
  updateProduct
);

productRouter.patch(
  "/categories/:id",
  checkCategoryExists,
  checkProductOwner,
  updateCategory
);

productRouter.delete(
  "/:id",
  checkProductExists,
  checkProductOwner,
  deleteProduct
);

module.exports = { productRouter };
