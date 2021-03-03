var express = require("express");
var router = express.Router();
var sql = require("../conf/mysql.js");

//存储图片返回图片id
router.get("/uploding_image", function (req, res) {
  sql.query(
    'INSERT INTO Images (imageName) VALUES ("' + req.query.imageName + '")',
    function (err, result) {
      if (err) {
        res.send({
          code: 0,
          info: "图片存储失败",
        });
      } else {
        sql.query(
          'select * from Images where imageName= "' + req.query.imageName + '"',
          function (err, result) {
            if (err) {
              res.send({
                code: 0,
                info: "图片存储失败",
              });
            } else {
              res.send({
                code: 200,
                id: result[0].imageId,
              });
            }
          }
        );
        // console.log(result);
      }
    }
  );
});

module.exports = router;
