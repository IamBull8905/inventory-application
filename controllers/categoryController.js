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

function getNewCategoryForm(req, res) {
  res.render("categoryForm", {
    formTitle: "Create New Category",
    formAction: "/new",
  });
}

function getEditCategoryForm(req, res) {
  res.render("categoryForm", {
    formTitle: "Edit Category",
    formAction: `/edit/${categoryId}`,
    categoryName: categoryName,
    categoryDescription: categoryDescription,
  })
}

module.exports = {
  getAllCategoriesFromDb,
  renderCategoryView,
  getSingleCategoryFromDb,
  renderSingleCategoryView,
  getNewCategoryForm,
  getEditCategoryForm,
};
