const { body, validationResult, matchedData } = require("express-validator");
const { getAllCategoriesFromDb } = require("./categoryController");
const { getAllProducts, getSingleProduct, insertProduct, updateProduct } = require("../db/queries")

const links = [
  {href: "/", text: "Home"},
  {href: "/category", text: "Categories"},
  {href: "/product", text: "Products"},
];

const validateProduct = [
  body("productName")
    .trim()
    .notEmpty()
    .withMessage("Product name cannot be empty.")
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage("Product name must be in between 1 and 50 characters long."),
  body("productDescription")
    .trim()
    .notEmpty()
    .withMessage("Product description cannot be empty.")
    .isString()
    .isLength({ min: 10, max: 500 })
    .withMessage(
      "Product description must be between 10 and 500 characters long.",
    ),
  body("productPrice")
    .trim()
    .notEmpty()
    .withMessage("Product price cannot be empty.")
    .isInt({ min: 1 })
    .withMessage("Product price must be an integer greater than zero for Yen."),
  body("productStock")
    .trim()
    .notEmpty()
    .withMessage("Product stock cannot be empty.")
    .isInt({ min: 0 })
    .withMessage("Product stock must be a whole integer value."),
  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Please select a brand.")
    .isIn([
      "Sakura Fresh",
      "Ayataka",
      "Sakura Bento",
      "Nissin",
      "7-Eleven Japan",
      "Famichiki",
      "Lawson Uchi Café",
      "Sakura Mochi",
      "Calbee",
    ])
    .withMessage("Invalid brand selection."),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Please select a category.")
    .isString(),
];

async function getAllProductsFromDb(req, res, next) {
  console.log("Gets all the products from the db");
  next();
}

function renderProductView(req, res) {
  res.render("allProductView", { products: products, links: links });
}

async function getSingleProductFromDb(req, res, next) {
  console.log("Gets a single product from the db");
  next();
}

function renderSingleProductView(req, res) {
  res.render("singleProductView", {
    productName: productName,
    productPrice: productPrice,
    productBrand: productBrand,
    productCategory: productCategory,
    productStock: productStock,
    productDescription: productDescription,
    productId: productId,
  });
}

function getNewProductForm(req, res) {
  res.render("productForm", {
    formTitle: "Create Product",
    formAction: "/new",
  });
}

function getEditProductForm(req, res) {
  res.render("productForm", {
    formTitle: "Edit Product",
    formAction: `/edit/${productId}`,
    productName: productName,
    productDescription: productDescription,
    productPrice: productPrice,
    productStock: productStock,
    categories: categories,
  });
}

const insertNewProductIntoDb = [
  ...validateProduct,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("productForm", {
        formTitle: "Create Product",
        errors: errors.array(),
        formAction: "/new",
      });
    }
    const {
      productName,
      productDescription,
      productPrice,
      productStock,
      brand,
      category,
    } = matchedData(req);
    console.log("Add product into db");
    res.redirect("/product");
  },
];

const updateProductInDb = [
  ...validateProduct,
  async (req, res) => {
    const errors = validationResult(req);
    const id = req.params.productId;
    if (!errors.isEmpty()) {
      return res.status(400).render("productForm", {
        formTitle: "Update Product",
        formAction: `/edit/${id}`,
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productStock: req.body.productStock,
        categories: getAllCategoriesFromDb(),
      })
    }
    const {productName, productDescription, productPrice, productStock, brand, category} = matchedData(req);
    console.log("Edits the product in the db");
    res.redirect("/product")
  }
]

module.exports = {
  getAllProductsFromDb,
  renderProductView,
  getSingleProductFromDb,
  renderSingleProductView,
  getNewProductForm,
  getEditProductForm,
  insertNewProductIntoDb,
  updateProductInDb,
};
