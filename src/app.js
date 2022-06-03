/*var createError = require('http-errors');*/
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
const cookieAuthMiddleware = require("./middlewares/cookieAuthMiddleware");
const cartMiddleware = require("./middlewares/cartMiddleware")
const mercadopago = require('mercadopago');
require('dotenv').config();
const cors = require('cors'); // modulo para poder hacer peticiones al backend desde el frontend sin conflictos


var app = express();

// activacion del sever en port 3000 y configurando opciones de Heroku
app.listen(process.env.PORT || 3050, () =>
  console.log("servidor corriendo en puerto 3050")
);

// view engine setup
app.set("views", path.join(__dirname, "../src/views"));
app.set("view engine", "ejs");

// method override para PUT y DELETE
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(logger("dev"));
app.use(cors()); // eliminar para produccion.
app.use(
  session({
    secret: "ClessidraSecret!",
    resave: false,
    saveUninitialized: true,
  })
);

//Esto debería estar en una variable de entorno y no hardcoded
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || 'TEST-4230970286841296-042219-b17a89983b74b8eaf51141f53ed1de6b-59181451',
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./../public")));
app.use(cookieAuthMiddleware);
app.use(cartMiddleware)

// Requerir Ruteadores //
const productRoutes = require("./routes/product");
const mainRoutes = require("./routes/main");
const usersRouter = require("./routes/users");
const cartRouter = require("./routes/cart");
const apiRouter = require("./routes/api");

// Rutas //
app.use("/users", usersRouter);
app.use("/products", productRoutes);
app.use("/cart", cartRouter);
app.use("/api", apiRouter)
app.use("/", mainRoutes);


module.exports = app;
