const { body, validationResult, matchedData } = require("express-validator");

const validateCategory = [
  body("categoryName")
    .trim()
    .notEmpty()
    .withMessage("Category name cannot be empty.")
    .isAlpha()
    .withMessage("Category name must only contain letters.")
    .isLength({ min: 1, max: 10 })
    .withMessage("Category name must be in between 1 and 10 characters long."),
  body("categoryDescription")
    .trim()
    .notEmpty()
    .withMessage("Category description cannot be empty.")
    .isAlphanumeric()
    .withMessage("Category description can only contain letters and numbers.")
    .isLength({ min: 10, max: 500 })
    .withMessage(
      "Category description must be between 10 and 500 characters long."
    ),
];

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
  });
}

const insertNewCategoryIntoDb = [
  ...validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("categoryForm", {
        formTitle: "Create New Category",
        errors: errors.array(),
        formAction: "/new",
      });
    }
    const { categoryName, categoryDescription } = matchedData(req);
    console.log("Add category into db");
    res.redirect("/category");
  },
];

module.exports = {
  getAllCategoriesFromDb,
  renderCategoryView,
  getSingleCategoryFromDb,
  renderSingleCategoryView,
  getNewCategoryForm,
  getEditCategoryForm,
  insertNewCategoryIntoDb,
};
