const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: [true, "UserId is required for Cart"] },
    products: [
      {
        productId: {
          type: String,
        },
        productTitle: {
          type: String,
        },
        price: {
          type: Number,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    cartValue: { type: Number },
  },
  { timestamps: true }
);

CartSchema.pre("save", async function () {
  this.cartValue = this.products.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);
  this.cartValue = this.cartValue.toFixed(2);
});

module.exports = mongoose.model("Cart", CartSchema);
