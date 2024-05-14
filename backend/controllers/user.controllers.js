const User = require("../models/user.model");
const Product = require("../models/product.model");
const bcrypt = require("bcrypt");
const path = require("path");

//Function to add individual product to user cart
const addProductToCart = async (req, res) => {
  const userID = req.user._id;
  const { productID, quantity, productImage } = req.body;

  try {
    const user = await User.findById(userID);
    //User validation
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    //product validation
    const product = await Product.findById(productID);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    //check if item is already in cart
    const cartItemIndex = user.cart.items.findIndex((item) =>
      item.productID.equals(productID)
    );
    //if item already exists in cart increase it's quantity without adding a new item
    if (cartItemIndex > -1) {
      user.cart.items[cartItemIndex].quantity += parseInt(quantity);
      user.cart.items[cartItemIndex].total =
        user.cart.items[cartItemIndex].quantity * product.price;
    } else {
      //if item does not exist add item as new to cart items array
      user.cart.items.push({
        productID: product._id,
        quantity: quantity,
        productImage: productImage,
        total: quantity * product.price,
      });
    }

    await user.save();
    return res
      .status(200)
      .send({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to edit cart of a user
const editCart = async (req, res) => {
  const userID = req.user._id;
  const { cartItems } = req.body;

  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.cart.items = cartItems;

    await user.save();
    res
      .status(200)
      .send({ message: "Cart updated successfully", cart: user.cart });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to update user information
const updateUser = async (req, res) => {
  let {
    name = req.user.name,
    phone = req.user.phone,
    address = req.user.address,
    userType = req.user.userType,
    image = req.user.image,
  } = req.body;

  const userID = req.user._id;

  try {
    //phone validation
    if (phone.length < 8) {
      return res.status(400).send({ message: "invalid phone number" });
    }

    //address validation
    if (address.length < 10) {
      return res.status(400).send({ message: "address not detailed enough" });
    }

    //name validation and correction
    const trimmedName = name.trim();
    const hasValidName = /^\S(.*\s+.*)*\S$/.test(trimmedName);
    if (!hasValidName) {
      return res.status(400).send({ message: "Incomplete name" });
    }

    const nameParts = trimmedName.split(" ");
    const capitalizedNames = nameParts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1)
    );
    name = capitalizedNames.join(" ");
    //image
    if (req.files && req.files.image) {
      if (Array.isArray(req.files.image)) {
        return res
          .status(400)
          .send({ message: "Only one image can be uploaded at a time" });
      }
      const imageFile = req.files.image;

      const imageExtension = path.extname(imageFile.name);
      const imageName = `${Date.now()}${imageExtension}`;

      const imageDir = path.join(
        __dirname,
        "../public/images/users",
        imageName
      );
      await imageFile.mv(imageDir).catch((err) => {
        console.error(err);
        return res.status(500).send({ message: "Error uploading image" });
      });

      image = imageName;
    }
    //update
    await User.findByIdAndUpdate(userID, {
      name,
      phone,
      address,
      userType,
      image,
    });
    return res.status(200).send({ message: "user updated" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to get cart of a user
const getCart = async (req, res) => {
  const userID = req.user._id;
  try {
    const user = await User.findById(userID).populate(
      "cart.items.productID",
      "name barcode price"
    );

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    if (user.cart.items.length === 0) {
      return res.status(204).send({ message: "User cart is empty" });
    } else {
      const tempGrouping = {};

      user.cart.items.forEach((item) => {
        const id = item.productID._id.toString();
        if (!tempGrouping[id]) {
          tempGrouping[id] = { ...item.toObject(), quantity: 0, total: 0 };
        }
        tempGrouping[id].quantity += item.quantity;
        tempGrouping[id].total += item.total;
      });

      const groupedCartItems = Object.keys(tempGrouping).map(
        (key) => tempGrouping[key]
      );

      return res.status(200).send({
        message: "Items retrieved successfully",
        cartItems: groupedCartItems,
      });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

//Function to empty the cart of a user
const emptyCart = async (req, res) => {
  const userID = req.user._id;
  try {
    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await User.findByIdAndUpdate(userID, {
      $set: { "cart.items": [] },
    });
    return res.status(200).send({ message: "cart emptied successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};


//Function to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users?.length == 0) {
      return res.status(404).send({ message: "No users found" });
    }
    return res.status(200).send({ users: users });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = {
  addProductToCart,
  updateUser,
  getCart,
  emptyCart,
  editCart,
  getAllUsers,
};
