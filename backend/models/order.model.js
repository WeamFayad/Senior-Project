const mongoose = require("mongoose");
const orderscheme = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    delivery_date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "DELIVERED", "REJECTED"],
      default: "PENDING",
    },
    items: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        total: {
          type: Number,
          required: true,
          min: 0,
        },
        image: {
          type: String,
          default: "default_product_image.png",
        },
      },
    ],
    couponCode: {
      type: String,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderscheme);
module.exports = Order;
