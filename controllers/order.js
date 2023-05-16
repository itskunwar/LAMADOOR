const Cart = require("../models/Cart");
const Order = require("../models/Order");

const checkout = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const cart = await Cart.findOne({ userId });
    const { products, cartValue: amount } = cart;
    const { address } = req.body;
    const order = await Order.create({
      userId,
      products,
      amount,
      address,
    });
    cart.products = [];
    await cart.save();
    res.status(200).json({ message: "Order placed", order });
  } catch (err) {
    next(err);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const orders = await Order.find({ userId });
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    next(err);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

module.exports = { checkout, getOrders, deleteOrder, getAllOrders };
