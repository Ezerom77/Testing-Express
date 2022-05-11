const db = require("../../models");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

let userController = {
  usuarios: (req, res) => {
    db.Users.findAll().then(function (users) {
      res.render("usersList", { users: users });
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
    res.render("login");
  },
  edit: (req, res) => {
    res.render("edit", { user: req.session.user });
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
    let errors = validationResult(req);
    if (errors.isEmpty()) {
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
            res.render("login" , { error : "* Credenciales invalidas" });
          }
        }
        else {
          res.render("login" , { errorUser : "* Usuario inexistente" , oldData: req.body });
        } 
      });
    } else {
      res.render("login", { errors: errors.mapped() , oldData: req.body }); // Error hay campos vacíos
    }
},
  registro: (req, res) => {
    res.render("registro");
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
      res.render("login")
    } else {
      res.render("registro", {errors: errors.mapped() , oldData: req.body });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie("recordame");
    res.redirect("/users/login");
  },
};

// Exportar modulo
module.exports = userController;
