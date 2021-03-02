var express = require("express");
var router = express.Router();
var sql = require("../conf/mysql.js");
const exec = require("child_process").exec;
// const execSync = require('child_process').execSync;

//上传文章
router.post("/uploding_article", function (req, res) {
  sql.query(
    'INSERT INTO Articles (address,imageId,uid) VALUES ("' +
      req.address +
      '","' +
      req.imageId +
      '","' +
      req.uid +
      '")',
    function (err, result) {
      if (err) {
        res.send({
          code: 0,
          info: "文章存储失败",
        });
      } else {
        res.send({
          code: 200,
          id: result.id,
        });
        //   res.send(JSON.stringify(result));
        console.log(result);
      }
    }
  );
});

//搜索文章
router.post("/find_article", function (req, res) {
  let imageName;
  //todo:向测试文件夹中传递要测试的image

  // 异步执行
  exec("python find.py", function (error, stdout, stderr) {
    if (error) {
      console.info("stderr : " + stderr);
    }
    console.log("exec: " + stdout);
    imageName = stdout;
  });

  sql.query(
    'select imageName = "' + imageName + '" from Images',
    function (err, result) {
      if (err) {
        res.send({
          code: 0,
          info: "图片查找失败",
        });
      } else {
        const imageId = result.imageId;
        sql.query(
          'select imageId = "' + imageId + '" from Articles',
          function (err, result) {
            if (err) {
              res.send({
                code: 0,
                info: "该图片未找到对应文章",
              });
            } else {
              res.send(result);
            }
          }
        );
      }
    }
  );
});

module.exports = router;
