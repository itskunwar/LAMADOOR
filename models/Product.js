const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is missing"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Prdouct description is missing"],
    },
    image: { type: String, required: [true, "Product image is missing"] },
    size: { type: String },
    categories: { type: Array },
    color: { type: String },
    price: { type: Number, required: [true, "Product price is missing"] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
