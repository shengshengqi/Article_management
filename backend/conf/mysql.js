var mysql = require("mysql");

const config = {
  host: "129.204.218.96",
  port: "3306",
  user: "root",
  password: "Ssq03230202",
  database: "article_management",
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
};

var pool = mysql.createPool(config);

module.exports = pool;
