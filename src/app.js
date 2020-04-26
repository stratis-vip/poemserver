const createError = require("http-errors");
const express = require("express");
const exphbs = require("express-handlebars");
const browserify = require("browserify-middleware");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const session = require("express-session");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const statisticsRouter = require("./routes/statistics")
const poemsRouter = require("./routes/poems")
const queryRouter = require("./routes/query")
const categoriesRouter = require("./routes/categories")

const app = express();

// view engine setup
app
  .engine(
    "hbs",
    exphbs({
      extname: ".hbs"
      // defaultLayout: "layout",
      // layoutsDir: __dirname + "/views/layouts/",
      // partialsDir: __dirname + "/views/partials/"
    })
  )
  .set("view engine", "hbs")

  .use(cors())
  .get("/javascripts/bundle.js", browserify("./src/client/script.js"))
  .set("views", path.join(__dirname, "views"))
  // .set("view engine", "jade")

  .use(logger("dev"))
  .use(
    session({
      secret: "app",
      name: "app",
      resave: true,
      saveUninitialized: true
      // cookie: { maxAge: 6000 } /* 6000 ms? 6 seconds -> wut? :S */
    })
  )

  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(express.static(path.join(__dirname, "public")))

  .use("/", indexRouter)
  .use("/statistics", statisticsRouter)
  .use("/poems", poemsRouter)
  .use("/users", usersRouter)
  .use("/query", queryRouter)
  .use("/categories", categoriesRouter)

  // catch 404 and forward to error handler
  .use(function(req, res, next) {
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
