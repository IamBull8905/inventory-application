async function getAllProductsFromDb(req, res, next) {
  console.log("Gets all the products from the db");
  next();
}

function renderProductView(req, res) {
  res.render("productView", { products: products, links: links });
}

module.exports = {
    getAllProductsFromDb,
    renderProductView,
}