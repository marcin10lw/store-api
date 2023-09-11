const products = require("../products.json");

const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ products });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
