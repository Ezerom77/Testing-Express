/*var createError = require('http-errors');*/
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var app = express();

// activacion del sever en port 3000 y configurando opciones de Heroku
app.listen(process.env.PORT || 3000, () =>
  console.log("servidor corriendo en puerto 3000")
);


// view engine setup
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'ejs');

// method override para PUT y DELETE
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(logger('dev'));

app.use(session({secret: 'ClessidraSecret!'}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, './../public')));


// Requerir Ruteadores //
const productRoutes = require("./routes/product");
const mainRoutes = require("./routes/main");
const usersRouter = require('./routes/users');

// Rutas //
app.use('/users', usersRouter);
app.use("/products",productRoutes);
app.use('/',mainRoutes);


/* catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); */

/* error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;




