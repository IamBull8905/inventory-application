const { body, validationResult, matchedData } = require("express-validator");
const { getAllCategories, getSingleCategory, insertCategory, updateCategory, updateAffectedProducts, deleteCategory } = require("../db/queries");

const links = [
  {href: "/", text: "Home"},
  {href: "/category", text: "Categories"},
  {href: "/product", text: "Products"},
];

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
    .isLength({ min: 10, max: 500 })
    .withMessage(
      "Category description must be between 10 and 500 characters long.",
    ),
];

async function getAllCategoriesFromDb(req, res, next) {
  const categories = await getAllCategories();
  req.categories = categories;
  next();
}

function renderCategoryView(req, res) {
  res.render("allCategoryView", { categories: req.categories, links: links });
}

async function getSingleCategoryFromDb(req, res, next) {
  const categoryId = req.params.categoryId;
  const dbResponse = await getSingleCategory(categoryId);
  req.categoryName = dbResponse[0].category_name;
  req.categoryDescription = dbResponse[0].category_description;
  next();
}

function renderSingleCategoryView(req, res) {
  res.render("singleCategoryView", {
    categoryName: req.categoryName,
    categoryDescription: req.categoryDescription,
    categoryId: req.params.categoryId,
  });
}

function getNewCategoryForm(req, res) {
  res.render("categoryForm", {
    formTitle: "Create New Category",
    formAction: "/category/new",
  });
}

async function getEditCategoryForm(req, res) {
  const categoryInfo = await getSingleCategory(req.params.categoryId);
  res.render("categoryForm", {
    formTitle: "Edit Category",
    formAction: `/category/edit/${req.params.categoryId}`,
    categoryName: categoryInfo[0].category_name,
    categoryDescription: categoryInfo[0].category_description,
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
        formAction: "/category/new",
      });
    }
    const { categoryName, categoryDescription } = matchedData(req);
    await insertCategory(categoryName, categoryDescription);
    res.redirect("/category");
  },
];

const updateCategoryInDb = [
  ...validateCategory,
  async (req, res) => {
    const errors = validationResult(req);
    const id = req.params.categoryId;
    if (!errors.isEmpty()) {
      return res.status(400).render("categoryForm", {
        formTitle: "Update Category",
        errors: errors.array(),
        formAction: `/category/edit/${id}`,
        categoryName: req.body.categoryName,
        categoryDescription: req.body.categoryDescription,
      });
    }
    const { categoryName, categoryDescription } = matchedData(req);
    await updateCategory(id, categoryName, categoryDescription);
    res.redirect("/category");
  },
];

async function deleteCategoryFromDb(req, res) {
  await updateAffectedProducts(req.params.categoryId);
  await deleteCategory(req.params.categoryId);
  res.redirect("/category");
}

module.exports = {
  getAllCategoriesFromDb,
  renderCategoryView,
  getSingleCategoryFromDb,
  renderSingleCategoryView,
  getNewCategoryForm,
  getEditCategoryForm,
  insertNewCategoryIntoDb,
  updateCategoryInDb,
  deleteCategoryFromDb,
};
