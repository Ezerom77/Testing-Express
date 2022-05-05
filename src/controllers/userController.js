const db = require("../../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

let userController = {
  usuarios: (req, res) => {
    db.Users.findAll().then(function (users) {
      res.render("usersList", { title: "Todos los usuarios", users: users });
    });
  },
  perfil: (req, res) => {
    if (req.session.user) {
      const loggedUser = req.session.user;
      res.render("perfil", {
        title: "Ya ingresaste! Éstos son tus datos:",
        loggedUser: loggedUser,
      });
    } else {
      res.redirect("/users/login");
    }
  },
  login: (req, res) => {
    res.render("login", { title: "Login" });
  },
  edit: (req, res) => {
    res.render("edit", { title: "Editar Perfil", user: req.session.user });
  },

  update: (req, res) => {
    db.Users.update(
      {
        nombre: req.body.userName,
        apellido: req.body.userLastName,
        email: req.body.userEmail,
        // userPassword: req.body.userPassword,
      },
      { where: { id: req.session.user.id } }
    ).then(() => {
      db.Users.findOne({
        where: { email: req.body.userEmail },
      }).then((users) => {
            req.session.user = users;
            res.cookie("recordame", users.email, { maxAge: 6000000  });
            res.redirect("/users/perfil");
    });
  })
},

  logged: (req, res) => {
    db.Users.findOne({
      where: { email: req.body.email },
    }).then((users) => {
      if (users) {
        if (bcrypt.compareSync(req.body.password, users.password)) {
          req.session.user = users;
          // cookies
          if (req.body.recordame != undefined) {
            res.cookie("recordame", users.email, { maxAge: 6000000  });
          }
          res.redirect("/users/perfil");
        } else {
          res.render("login", {
            title: "Login",
            error: "Contraseña incorrecta",
          });
        }
      } else {
        res.render("login", {
          title: "Login",
          error: "Credenciales invalidas",
        });
      }
    });
  },
  registro: (req, res) => {
    res.render("registro", { title: "Registro" });
  },
  store: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let newUser = {
        nombre: req.body.userName,
        apellido: req.body.userLastName,
        email: req.body.userEmail,
        password: bcrypt.hashSync(req.body.userPassword, 10),
        avatar: req.file.filename,
        fecha_creacion: new Date(),
      };
      db.Users.create(newUser);
      res.render("login", { title: "Login" });
    } else {
      res.render("wrongForm");
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("recordame");
    res.redirect("/users/login");
  },

  // este metodo vamos a tener que moverlo a otro lado...
  carrito: (req, res) => {
    res.render("carrito", { title: "Carrito de compras" });
  },
};

// Exportar modulo
module.exports = userController;
