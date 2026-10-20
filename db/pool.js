const { Pool } = require("pg");
loadEnvFile();

module.exports = new Pool({
  connectionString: process.env.INTERNAL_DATABASE_URL,
});
