const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("Renders homepage wip");
});

module.exports = indexRouter;