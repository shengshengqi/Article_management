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

// const connect = mysql.createConnection(config);
// connect.on("error", function (err) {
//   console.log(err.code); // 'ER_BAD_DB_ERROR'
// });
// connect.connect();
// exports.query = connect.query;

var pool = mysql.createPool(config);

exports.query = function (sql, data) {
  pool.getConnection(function (err, connection) {
    connection.query({ sql, timeout: 40000 }, function (err, result) {
      data(err, result);
      connection.release();
    });
  });
};
module.exports = pool;
