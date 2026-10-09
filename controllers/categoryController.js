async function getAllCategoriesFromDb(req, res, next) {
  console.log("Gets all the categories from the db");
  next();
}

function renderCategoryView(req, res) {
  res.render("allCategoryView", { categories: categories, links: links });
}

async function getSingleCategoryFromDb(req, res, next) {
  console.log("Gets a single category from the db");
  next();
}

function renderSingleCategoryView(req, res) {
  res.render("singleCategoryView", {
    categoryName: categoryName,
    categoryDescription: categoryDescription,
    categoryId: categoryId,
  });
}

module.exports = {
  getAllCategoriesFromDb,
  renderCategoryView,
};
