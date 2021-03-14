var express = require("express");
var router = express.Router();
var sql = require("../conf/mysql.js");

//登录验证
router.get("/login", function (req, res) {
  var username = req.query.username;
  var password = req.query.password;
  console.log(username, password);
  sql.query(
    'select * from Users where username = "' + username + '"',
    function (err, result) {
      if (err) {
        res.send({
          code: 0,
          info: "登录出现错误",
        });
      } else {
        if (result.length !== 0) {
          //判断返回为空方法一
          if (password == result[0].password) {
            res.send("登陆成功");
          } else {
            res.send("密码错误");
          }
        } else {
          res.send("该用户不存在,请先注册");
        }
        console.log(result);
      }
    }
  );
});

// 增加用户
router.get("/register", function (req, res) {
  var username = req.query.username;
  var password = req.query.password;
  sql.query(
    'select * from Users where username = "' + username + '"',
    function (err, result) {
      if (err) {
        res.send({
          code: 0,
          info: "注册出现错误",
        });
      } else {
        if (JSON.stringify(result) !== "[]") {
          //判断放回为空方法二
          res.send("用户名已存在，请直接登录");
        } else {
          sql.query(
            'INSERT INTO Users (username, password,isAdmin) VALUES ("' +
              username +
              '", "' +
              password +
              '","否")',
            function (err) {
              if (err) {
                res.send("注册失败");
              } else {
                res.send("注册成功");
              }
            }
          );
        }
      }
    }
  );
});

//判断是否是管理员
router.get("/isAdmin", function (req, res) {
  sql.query(
    'select * from Users where username = "' + req.query.username + '"',
    function (err, result) {
      if (err) {
        res.send({
          code: 0,
          info: "出现位置错误",
        });
      } else {
        res.send(result[0].isAdmin);
        console.log(result);
      }
    }
  );
});

module.exports = router;
