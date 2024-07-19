const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    originalPrice: {
      type: Number,
      required: true,
    },
    discountAvailable: {
      type: Boolean,
      required: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
  },
  productImageUrl: {
    type: String,
    required: true,
  },
  category: {
    mainCategory: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
  },
  starRating: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
