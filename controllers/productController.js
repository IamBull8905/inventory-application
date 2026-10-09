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

module.exports = {
  getAllProductsFromDb,
  renderProductView,
  getSingleProductFromDb,
  renderSingleProductView,
};
