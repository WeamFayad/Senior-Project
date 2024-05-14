const express = require("express");
const {
  addProductToCart,
  updateUser,
  getCart,
  emptyCart,
  createChatSession,
  getAllChatSession,
  deleteChatSession,
  editCart,
  getAllUsers,
} = require("../controllers/user.controllers");
const router = express.Router();

router.post("/", addProductToCart);
router.put("/", updateUser);
router.get("/", getCart);
router.get("/emptyCart", emptyCart);
router.put("/editCart", editCart);
router.get("/all-users", getAllUsers);
module.exports = router;
