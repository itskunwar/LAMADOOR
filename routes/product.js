const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const adminAuth = require("../middlewares/adminAuth");
const {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");

const productRouter = express.Router();

productRouter.post("/create-product", jwtAuth, adminAuth, createProduct);
productRouter.get("/", jwtAuth, getProducts);
productRouter.get("/:id", jwtAuth, getProduct);
productRouter.delete("/:id", jwtAuth, adminAuth, deleteProduct);
productRouter.put("/:id", jwtAuth, adminAuth, updateProduct);

module.exports = productRouter;
