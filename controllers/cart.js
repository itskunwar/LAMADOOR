const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const { userId } = req.user;
    const { price, title } = await Product.findById(productId);
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      let cartValue = price * quantity;
      let cartItem = {
        productId,
        productTitle: title,
        price,
        quantity,
      };
      await Cart.create({
        userId,
        products: [cartItem],
        cartValue,
      });
    } else {
      const { products } = cart;
      const product = products.find(
        (product) => product.productId == productId
      );
      if (product) {
        product.quantity += Number(quantity);
      } else {
        products.push({
          productId,
          productTitle: title,
          price,
          quantity,
        });
      }
      await cart.save();
    }
    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (err) {
    next(err);
  }
};

const getCart = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const cart = await Cart.findOne({ userId });
    res.status(200).json({ cart });
  } catch (err) {
    next(err);
  }
};

const removeCartProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { userId } = req.user;
    const cart = await Cart.findOne({ userId });
    cart.products = cart.products.filter(
      (product) => product.productId != productId
    );
    await cart.save();
    res.status(200).json({ message: "Product removed from cart!" });
  } catch (err) {
    next(err);
  }
};

module.exports = { addToCart, getCart, removeCartProduct };
