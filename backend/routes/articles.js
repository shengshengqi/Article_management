var express = require("express");
var router = express.Router();
var sql = require("../conf/mysql.js");
// const exec = require("child_process").exec;
const execSync = require("child_process").execSync;

//上传文章
router.post("/uploding_article", function (req, res) {
  sql.query(
    'INSERT INTO Articles (address,imageId,uid, articleName) VALUES ("' +
      req.body.address +
      '","' +
      req.body.imageId +
      '","' +
      req.body.uid +
      '","' +
      req.body.articleName +
      '")',
    function (err, result) {
      if (err) {
        res.json({ success: false, info: "文章存储失败", message: err.message });
      } else {
        res.send({
          code: 200,
        });
      }
    }
  );
});

//删除文章
router.get("/delete_article", function (req, res) {
  sql.query('DELETE FROM Articles WHERE articleId="' + req.query.id + '"', function (err, result) {
    if (err) {
      res.send("文章删除失败");
    } else {
      res.send("SUCCESS");
    }
  });
});

//获取文章列表
router.get("/list", function (req, res) {
  sql.query('SELECT * FROM Articles where uid = "' + req.query.id + '"', function (err, result) {
    if (err) {
      res.send("文章数据获取失败");
    } else {
      res.send(result);
    }
  });
});

//搜索文章
router.get("/find_article", function (req, res) {
  // let imageName;
  //todo:向测试文件夹中传递要测试的image

  // 同步执行，去掉python print末尾带的换行符
  const imageName = execSync("python C:/Users/shengqiongyi/Desktop/wt/Article_management/backend/2/1-find.py").toString().replace(/\r\n/g, "");

  console.log(imageName);
  sql.query('select * from Images where imageName = "' + imageName + '"', function (err, result) {
    if (err) {
      res.send({
        code: 0,
        info: err,
      });
    } else {
      console.log(result);
      if (result.length == 0) {
        res.send({
          code: 0,
          info: "图片查找失败",
        });
      } else {
        const imageId = result[0].imageId;
        sql.query('select * from Articles where imageId = "' + imageId + '"', function (err, result) {
          if (err) {
            res.send({
              code: 0,
              info: "该图片未找到对应文章",
            });
          } else {
            if (result.length == 0) {
              res.send({
                code: 0,
                info: "该图片未找到对应文章",
              });
            } else {
              res.send(JSON.stringify(result));
            }
          }
        });
      }
    }
  });
});

module.exports = router;
