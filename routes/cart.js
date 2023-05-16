const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const {
  addToCart,
  getCart,
  removeCartProduct,
} = require("../controllers/cart");

const cartRouter = express.Router();

cartRouter.post("/add-to-cart", jwtAuth, addToCart);
cartRouter.get("/", jwtAuth, getCart);
cartRouter.delete("/:productId", jwtAuth, removeCartProduct);

module.exports = cartRouter;
