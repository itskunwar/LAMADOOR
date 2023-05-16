const express = require("express");
const jwtAuth = require("../middlewares/jwtAuth");
const adminAuth = require("../middlewares/adminAuth");
const {
  getOrders,
  checkout,
  deleteOrder,
  getAllOrders,
} = require("../controllers/order");

const orderRouter = express.Router();

orderRouter.post("/checkout", jwtAuth, checkout);
orderRouter.get("/", jwtAuth, getOrders);
orderRouter.delete("/:orderId", jwtAuth, adminAuth, deleteOrder);
orderRouter.get("/orders", jwtAuth, adminAuth, getAllOrders);

module.exports = orderRouter;
