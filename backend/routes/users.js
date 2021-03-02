var express = require("express");
var router = express.Router();
var sql = require("../conf/mysql.js");

//登录验证
router.get("/login", function (req, res) {
  sql.query(
    'select username = "' + req.username + '" from Users',
    function (err, result) {
      if (err) {
        res.send({
          code: 0,
          info: "该用户不存在",
        });
      } else {
        if (req.password == result.password) {
          res.send("登陆成功");
        } else {
          res.send("密码错误");
        }
        //   res.send(JSON.stringify(result));
        console.log(result);
      }
    }
  );
});

// 增加用户
router.get("/register", function (req, res) {
  sql.query(
    'select username = "' + req.username + '" from Users',
    function (err, result) {
      if (err) {
        sql.query(
          'INSERT INTO Users (username, password) VALUES ("' +
            req.username +
            '", "' +
            req.password +
            '")',
          function (err) {
            if (err) {
              res.send({
                code: 0,
                info: "注册失败",
              });
            } else {
              res.send("注册成功");
            }
          }
        );
      } else {
        res.send("用户名已存在");
        //   res.send(JSON.stringify(result));
        console.log(result);
      }
    }
  );
});

//判断是否是管理员
router.get("/isAdmin", function (req, res) {
  sql.query(
    'select username = "' + req.username + '" from Users',
    function (err, result) {
      if (err) {
        res.send({
          code: 0,
          info: "出现位置错误",
        });
      } else {
        res.send(req.isAdmin);
        console.log(result);
      }
    }
  );
});

module.exports = router;
