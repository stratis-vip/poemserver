"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var browserify_middleware_1 = __importDefault(require("browserify-middleware"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var express_session_1 = __importDefault(require("express-session"));
var index_1 = __importDefault(require("./routes/index"));
var users_1 = __importDefault(require("./routes/users"));
var statistics_1 = __importDefault(require("./routes/statistics"));
var poems_1 = __importDefault(require("./routes/poems"));
var query_1 = __importDefault(require("./routes/query"));
var categories_1 = __importDefault(require("./routes/categories"));
var app = express_1.default();
// view engine setup
app
    .engine("hbs", express_handlebars_1.default({
    extname: ".hbs"
    // defaultLayout: "layout",
    // layoutsDir: __dirname + "/views/layouts/",
    // partialsDir: __dirname + "/views/partials/"
}))
    .set("view engine", "hbs")
    .use(cors_1.default())
    .get("/javascripts/bundle.js", browserify_middleware_1.default("./src/client/script.js"))
    .set("views", path_1.default.join(__dirname, "views"))
    // .set("view engine", "jade")
    .use(morgan_1.default("dev"))
    .use(express_session_1.default({
    secret: "app",
    name: "app",
    resave: true,
    saveUninitialized: true
    // cookie: { maxAge: 6000 } /* 6000 ms? 6 seconds -> wut? :S */
}))
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: false }))
    .use(cookie_parser_1.default())
    .use(express_1.default.static(path_1.default.join(__dirname, "public")))
    .use("/", index_1.default)
    .use("/statistics", statistics_1.default)
    .use("/poems", poems_1.default)
    .use("/users", users_1.default)
    .use("/query", query_1.default)
    .use("/categories", categories_1.default)
    // catch 404 and forward to error handler
    .use(function (req, res, next) {
    next(http_errors_1.default(404));
});
// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
exports.default = app;
//# sourceMappingURL=app.js.map