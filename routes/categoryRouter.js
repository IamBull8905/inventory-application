const { Router } = require("express");
const categoryRouter = Router();

categoryRouter.get("/new", getNewCategoryForm);

categoryRouter.post("/new", validateCategory, insertNewCategoryIntoDb);

categoryRouter.get("/", getAllCategoriesFromDb);

categoryRouter.get("/:categoryId", getSingleCategoryFromDb);

categoryRouter.get("/edit/:categoryId", getEditCategoryForm);

categoryRouter.post("/edit/:categoryId", validateCategory, editCategory);

categoryRouter.post("/delete/:categoryId", deleteCategoryFromDb);

module.exports = categoryRouter;
