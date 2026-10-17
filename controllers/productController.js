const { body, validationResult, matchedData } = require("express-validator");
const { getAllCategories, getAllProducts, getSingleCategory, getSingleProduct, getSingleBrand, insertProduct, updateProduct } = require("../db/queries")

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
  const fetchedProducts = await getAllProducts();
  req.products = fetchedProducts;
  next();
}

function renderProductView(req, res) {
  res.render("allProductView", { products: req.products, links: links });
}

async function getSingleProductFromDb(req, res, next) {
  const fetchedSingleProduct = await getSingleProduct(req.params.productId);
  req.productDetails = fetchedSingleProduct;
  next();
}

async function renderSingleProductView(req, res) {
  const productDetails = req.productDetails[0];
  const categoryDetails = await getSingleCategory(productDetails.category_id);
  const brandDetails = await getSingleBrand(productDetails.brand_id);
  res.render("singleProductView", {
    productName: productDetails.product_name,
    productPrice: productDetails.price,
    productBrand: brandDetails[0].brand_name,
    productCategory: categoryDetails[0].category_name,
    productStock: productDetails.stock,
    productDescription: productDetails.product_description,
    productId: req.params.productId,
  });
}

async function getNewProductForm(req, res) {
  res.render("productForm", {
    formTitle: "Create Product",
    formAction: "/product/new",
    categories: await getAllCategories(),
  });
}

async function getEditProductForm(req, res) {
  const productInfo = await getSingleProduct(req.params.productId);
  const categories = await getAllCategories();
  res.render("productForm", {
    formTitle: "Edit Product",
    formAction: `/product/edit/${req.params.productId}`,
    productName: productInfo[0].product_name,
    productDescription: productInfo[0].product_description,
    productPrice: productInfo[0].price,
    productStock: productInfo[0].stock,
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
    await insertProduct(productName, productDescription, productPrice, productStock, brand, category);
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
    await updateProduct(id, productName, productDescription, productPrice, productStock, brand, category);
    res.redirect("/product");
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
