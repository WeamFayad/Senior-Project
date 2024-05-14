const express = require("express");
const {
  addProduct,
  editProduct,
  getAllproducts,
  getProduct,
  deleteProduct,
  filterProducts,
  productStats,
} = require("../controllers/product.controllers");
const router = express.Router();

router.post("/", addProduct);
router.put("/", editProduct);
router.get("/", getAllproducts);
router.get("/:barcode", getProduct);
router.delete("/:id", deleteProduct);
router.post("/filter", filterProducts);
router.post("/stats", productStats);
module.exports = router;
