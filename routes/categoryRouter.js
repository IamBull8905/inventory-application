const { Router } = require("express");
const { getAllCategoriesFromDb, renderCategoryView, getSingleCategoryFromDb, renderSingleCategoryView } = require("../controllers/categoryController");
const categoryRouter = Router();

categoryRouter.get("/new", getNewCategoryForm);

categoryRouter.post("/new", validateCategory, insertNewCategoryIntoDb);

categoryRouter.get("/", getAllCategoriesFromDb, renderCategoryView);

categoryRouter.get("/:categoryId", getSingleCategoryFromDb, renderSingleCategoryView);

categoryRouter.get("/edit/:categoryId", getEditCategoryForm);

categoryRouter.post("/edit/:categoryId", validateCategory, editCategory);

categoryRouter.post("/delete/:categoryId", deleteCategoryFromDb);

module.exports = categoryRouter;
