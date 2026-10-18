const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query(
    `SELECT id, category_name, category_description FROM category ORDER BY category_name ASC;`,
  );
  return rows;
}

async function getAllProducts() {
  const { rows } = await pool.query(
    `SELECT * FROM product
      ORDER BY product_name ASC;
        `,
  );
  return rows;
}

//might need OFFSET for these two queries
async function getSingleCategory(categoryId) {
  const { rows } = await pool.query(`SELECT * FROM category WHERE id = $1;`, [
    categoryId,
  ]);
  return rows;
}

async function getSingleProduct(productId) {
  const { rows } = await pool.query(`SELECT * FROM product WHERE id = $1;`, [
    productId,
  ]);
  return rows;
}

async function getSingleBrand(brandId) {
  const { rows } = await pool.query(`SELECT * FROM brand WHERE id = $1;`, [
    brandId,
  ]);
  return rows;
}

async function insertCategory(categoryName, categoryDescription) {
  await pool.query(
    `INSERT INTO category (category_name, category_description) VALUES ($1, $2);`,
    [categoryName, categoryDescription],
  );
}

async function insertProduct(
  productName,
  productDescription,
  productPrice,
  productStock,
  brandName,
  categoryName,
) {
  const brandId = await pool.query(
    `SELECT id FROM brand WHERE brand_name = $1;`,
    [brandName],
  );
  const categoryId = await pool.query(
    `SELECT id FROM category WHERE category_name = $1;`,
    [categoryName],
  );
  await pool.query(
    `INSERT INTO product (product_name, product_description, price, stock, brand_id, category_id) VALUES ($1, $2, $3, $4, $5, $6);`,
    [
      productName,
      productDescription,
      productPrice,
      productStock,
      brandId.rows[0].id,
      categoryId.rows[0].id,
    ],
  );
}

async function updateCategory(categoryId, categoryName, categoryDescription) {
  await pool.query(
    `UPDATE category
    SET category_name = $1, category_description = $2
    WHERE id = $3;`,
    [categoryName, categoryDescription, categoryId],
  );
}

async function updateProduct(
  productId,
  productName,
  productDescription,
  productPrice,
  productStock,
  brand,
  category,
) {
  const brandId = await pool.query(
    `SELECT id FROM brand WHERE brand_name = $1`,
    [brand],
  );
  const categoryId = await pool.query(
    `SELECT id FROM category WHERE category_name = $1`,
    [category],
  );
  await pool.query(
    `UPDATE product
    SET product_name = $1, product_description = $2, price = $3, stock = $4, brand_id = $5, category_id = $6
    WHERE id = $7;
    `,
    [
      productName,
      productDescription,
      productPrice,
      productStock,
      brandId.rows[0].id,
      categoryId.rows[0].id,
      productId,
    ],
  );
}

async function deleteProduct(productId) {
  await pool.query(`DELETE FROM product WHERE id = $1;`, [productId]);
}

async function updateAffectedProducts(categoryId) {
  await pool.query(
    `
    UPDATE product
    SET category_id = null
    WHERE category_id = $1;
    `,
    [categoryId],
  );
}

async function deleteCategory(categoryId) {
  await pool.query(`DELETE FROM category WHERE id = $1;`, [categoryId]);
}

module.exports = {
  getAllCategories,
  getAllProducts,
  getSingleCategory,
  getSingleProduct,
  getSingleBrand,
  insertCategory,
  insertProduct,
  updateCategory,
  updateProduct,
  deleteProduct,
  updateAffectedProducts,
  deleteCategory,
};
