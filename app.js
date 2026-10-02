const express = require("express");
const path = require("node:path");
const { loadEnvFile } = require("node:process");
const indexRouter = require("./routes/indexRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const app = express();

loadEnvFile();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/category", categoryRouter);
app.use("/product", productRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Japanese Convenience Store App - listening on port ${PORT}!`);
});
