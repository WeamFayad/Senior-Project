const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  phone: {
    type: String,
    minlength: 8,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },

  userType: {
    type: String,
    enum: ["USER", "ADMIN", "DEACTIVATED"],
    default: "USER",
  },
  image: {
    type: String,
    default: "default_profile_image.png",
  },
  cart: {
    items: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productImage: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
  },

});

userschema.pre(
  "save",
  async function (next) {
    try {
      if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      }
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userschema);

module.exports = User;
