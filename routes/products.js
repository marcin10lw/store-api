const router = require("express").Router();
const {
  getAllProductsStatic,
  getAllProducts,
} = require("../controllers/products");

router.get("/static", getAllProductsStatic);
router.get("/", getAllProducts);

module.exports = router;
