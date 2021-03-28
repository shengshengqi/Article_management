var createError = require("http-errors");
var express = require("express");
const port = 3001;
var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");

//这里是把user.js和index.js都require进来
var usersRouter = require("./routes/users");
var imageRouter = require("./routes/images");
var articleRouter = require("./routes/articles");

var app = express();
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

// // view engine setup
//这里是渲染前端页面用的jade
// app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

//让页面变成ejs模板,这个要看前端页面用什么，到时候不能忘了改啊
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// app.use(logger("dev"));
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype.indexOf("image") >= 0) {
      cb(null, "./public/");
    } else {
      cb(null, "./uploads/");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("recfile"), (req, res) => {
  console.log("req body", req.body);
  console.log("req file", req.file);
  if (req.file.fieldname) {
    res.status(200).json({ success: true, data: req.file.filename });
  } else {
    res.json({ success: false });
  }
});

app.use(
  express.static(path.join(__dirname, "./public"), {
    maxAge: 24 * 60 * 60 * 1000 * 7,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter); //这个'user'路径，即在浏览器里输入http://localhost:3000/users ,就会访问到user.js渲染的页面
app.use("/images", imageRouter);
app.use("/articles", articleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
