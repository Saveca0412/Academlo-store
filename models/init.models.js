const { Order } = require("./order.models");
const { User } = require("./user.models");
const { Product } = require("./product.models");
const { Cart } = require("./cart.model");
const { ProductInCart } = require("./productInCart.model");
const { ProductImg } = require("./productImg.model");
const { Category } = require("./category.models");

const initModels = () => {
  //*
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User);
  //*
  User.hasOne(Cart, { foreignKey: "userId" });
  Cart.belongsTo(User);
  //*
  User.hasMany(Product, { foreignKey: "userId" });
  Product.belongsTo(User);
  //*
  Order.hasMany(Product, { foreignKey: "userId" });
  Product.belongsTo(Order);
  //*
  Cart.hasOne(Order, { foreignKey: "cartId" });
  Order.belongsTo(Cart);
  //*
  Cart.hasMany(ProductInCart, { foreignKey: "cartId" });
  ProductInCart.belongsTo(Cart);
  //*
  Cart.hasMany(Product, { foreignKey: "userId" });
  Product.belongsTo(Cart);
  //*
  Product.hasMany(ProductImg, { foreignKey: "productId" });
  ProductImg.belongsTo(Product);
  //*
  Category.hasOne(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category);
  //*
  ProductInCart.hasMany(ProductImg, { foreignKey: "productId" });
  ProductImg.belongsTo(ProductInCart);
  //pendiente
  ProductInCart.hasMany(Product, { foreignKey: "productId" });
  Product.belongsTo(ProductInCart);
};
module.exports = { initModels };
