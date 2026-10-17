const { Router } = require("express");
const { getAllProductsFromDb, renderProductView, getSingleProductFromDb, renderSingleProductView, getNewProductForm, getEditProductForm, insertNewProductIntoDb, updateProductInDb } = require("../controllers/productController");
const productRouter = Router();

productRouter.get("/new", getNewProductForm);

productRouter.post("/new", insertNewProductIntoDb);

productRouter.get("/", getAllProductsFromDb, renderProductView);

productRouter.get("/:productId", getSingleProductFromDb, renderSingleProductView);

productRouter.get("/edit/:productId", getEditProductForm);

productRouter.post("/edit/:productId", updateProductInDb);

// productRouter.post("/delete/:productId", deleteProductFromDb);

module.exports = productRouter;
