const { Router } = require("express");
const { getAllProductsFromDb, renderProductView } = require("../controllers/productController");
const productRouter = Router();

productRouter.get("/new", getNewProductForm);

productRouter.post("/new", validateProduct, insertNewProductIntoDb);

productRouter.get("/", getAllProductsFromDb, renderProductView);

productRouter.get("/:productId", getSingleProductFromDb);

productRouter.get("/edit/:productId", getEditProductForm);

productRouter.post("/edit/:productId", validateProduct, editProduct);

productRouter.post("/delete/:productId", deleteProductFromDb);

module.exports = productRouter;
