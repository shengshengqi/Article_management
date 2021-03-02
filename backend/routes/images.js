var express = require("express");
var router = express.Router();
var sql = require("../conf/mysql.js");

//存储图片
router.post("/uploding_image", function (req, res) {
  sql.query(
    'INSERT INTO Images (imageName) VALUES ("' + req.imageName + '")',
    function (err, result) {
      if (err) {
        res.send({
          code: 0,
          info: "图片存储失败",
        });
      } else {
        res.send({
          code: 200,
          id: result.imageId,
        });
        //   res.send(JSON.stringify(result));
        console.log(result);
      }
    }
  );
});

module.exports = router;
