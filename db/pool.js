const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: process.env.INTERNAL_DATABASE_URL,
});
