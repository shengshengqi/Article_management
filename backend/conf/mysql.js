var mysql = require("mysql");

var pool = mysql.createPool({
  host: "129.204.218.96",
  port: "3306",
  user: "root",
  password: "Ssq03230202",
  database: "article_management",
});

exports.query = function (sql, data) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, result) {
      data(err, result);
      connection.release();
    });
  });
};
