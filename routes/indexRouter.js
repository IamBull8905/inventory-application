const { Router } = require("express");
const indexRouter = Router();
const links = [
  { href: "/", text: "Home" },
  { href: "/category", text: "Categories" },
  { href: "/product", text: "Products" },
];

indexRouter.get("/", (req, res) => {
  res.render("home", { links: links });
});

module.exports = indexRouter;
