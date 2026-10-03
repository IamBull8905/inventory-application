async function getAllCategoriesFromDb(req, res, next) {
  console.log("Gets all the categories from the db");
  next();
}

function renderCategoryView(req, res) {
  res.render("categoryView", { categories: categories, links: links });
}

module.exports = {
    getAllCategoriesFromDb,
    renderCategoryView,
}