var express = require("express");
var router = express.Router();
var sql = require("../conf/mysql.js");
const mysql = require("mysql");

//存储图片返回图片id
router.get("/uploding_image", function (req, res) {
  sql.query('INSERT INTO Images (imageName) VALUES ("' + req.query.imageName + '")', function (err, result) {
    if (err) {
      res.send({
        code: -1,
        info: "图片存储失败",
        message: err.message,
      });
    } else {
      sql.query('select * from Images where imageName= "' + req.query.imageName + '"', function (err, result) {
        if (err) {
          res.send({
            code: 1,
            info: "图片存储失败",
          });
        } else {
          res.send({
            code: 200,
            id: result[0].imageId,
          });
        }
      });
      // console.log(result);
    }
  });
});

// 通过图片名称搜索对应的文章
router.get("/find_article_by_imageName", function (req, res) {
  const queryString = mysql.format(`select * from Images where imageName like ?`, [`%${req.query.imageName}%`]);

  sql.query(queryString, function (err, result) {
    if (err) {
      console.log(err);
      res.send({
        code: -1,
        info: "图片搜索失败",
        message: err.message,
      });
    } else {
      const images = JSON.parse(JSON.stringify(result));
      async function send() {
        const articles = [];
        await Promise.all(
          images.map((element) => {
            return new Promise((resolve, reject) => {
              sql.query('select * from Articles where imageId= "' + element.imageId + '"', function (err, result) {
                if (err) {
                  console.log("error", err);
                  resolve([]);
                } else {
                  const data = JSON.parse(JSON.stringify(result));
                  articles.push(...data);
                  // console.log(...data);
                  resolve(...data);
                }
              });
            });
          })
        );
        // console.log("articles", articles);

        res.send({
          data: articles,
        });
      }
      send();
    }
  });
});

module.exports = router;
