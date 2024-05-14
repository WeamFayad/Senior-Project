const express = require("express");
const {
  addOrder,
  editOrder,
  getAllOrders,
  getAllOrdersOfUser,
  getOrder,
  orderStats,
} = require("../controllers/order.controllers");
const router = express.Router();

router.post("/", addOrder);
router.put("/", editOrder);
router.post("/all", getAllOrders);
router.post("/:id", getAllOrdersOfUser);
router.get("/:id", getOrder);
router.get("/", orderStats);
module.exports = router;
