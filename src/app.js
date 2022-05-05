/*var createError = require('http-errors');*/
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const cookieAuthMiddleware = require("./middlewares/cookieAuthMiddleware");

var app = express();

// activacion del sever en port 3000 y configurando opciones de Heroku
app.listen(process.env.PORT || 3000, () =>
  console.log("servidor corriendo en puerto 3000")
);

// view engine setup
app.set("views", path.join(__dirname, "../src/views"));
app.set("view engine", "ejs");

// method override para PUT y DELETE
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(logger("dev"));

app.use(
  session({
    secret: "ClessidraSecret!",
    resave: false,
    saveUninitialized: true,
  })
);


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./../public")));
app.use(cookieAuthMiddleware);

// Requerir Ruteadores //
const productRoutes = require("./routes/product");
const mainRoutes = require("./routes/main");
const usersRouter = require("./routes/users");

// Rutas //
app.use("/users", usersRouter);
app.use("/products", productRoutes);
app.use("/", mainRoutes);

module.exports = app;
