const Product = require("../models/product");

const getQueryObject = (req) => {
  const { featured, company, name, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operatorsMap = {
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
      ">": "$gt",
      ">=": "$gte",
    };

    const numericFiltersString = numericFilters.replace(
      /([<>]=?|=)/g,
      (match) => `-${operatorsMap[match]}-`
    );

    numericFiltersString.split(",").forEach((item) => {
      const arr = ["price", "rating"];
      const [key, operator, value] = item.split("-");

      if (arr.includes(key)) {
        queryObject[key] = { [operator]: Number(value) };
      }
    });
  }

  return queryObject;
};

const getAllProducts = async (req, res) => {
  const { sort, select } = req.query;
  const queryObject = getQueryObject(req);

  let response = Product.find(queryObject);

  if (sort) {
    const sortString = sort.split(",").join(" ");
    response = response.sort(sortString);
  } else {
    response = response.sort("createdAt");
  }

  if (select) {
    const selectString = select.split(",").join(" ");
    response = response.select(selectString);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  response = response.skip(skip).limit(limit);

  const products = await response;
  res.status(200).json({ nbHits: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
