// Requires
// const fs = require("fs");
const db = require("../../models");
const path = require("path");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// const usersFilePath = path.join(__dirname, "../data/users.json");
// const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

// Controladores
let userController = {
  usuarios: (req, res) => {
    res.render("usersList", { title: "Todos los usuarios", users: users });
  },
  perfil: (req, res) => {
    if(req.session.user) {
      const loggedUser = req.session.user;
      res.render("perfil", { title: "Ya ingresaste! Éstos son tus datos:", loggedUser: loggedUser });
    }
    else {
      res.redirect('/users/login');
    }
  },
  login: (req, res) => {
    res.render("login", { title: "Login" });
  },

  -const project = await Project.findOne({ where: { title: 'My Title' } });
  if (project === null) {
    console.log('Not found!');
  } else {
    console.log(project instanceof Project); // true
    console.log(project.title); // 'My Title'


  logged: (req, res) => {
    // for (let i = 0; i < users.length; i++) {
      // if (users[i].email == req.body.email) {
   let userToLogin = db.Users.findOne({
      where: {email: req.body.email}
   })
   console.log(userToLogin);
   if (userToLogin) {
      if (bcrypt.compareSync(req.body.password, userToLogin.password)) {
          // req.session.user = users[i];
          // console.log(req.session.user)
          res.redirect("/users/perfil");
        } else {
          res.render("login", {
            title: "Login",
            error: "Contraseña incorrecta",
          });
        }
      } else {
        res.send("Usuario no encontrado");
      }
    
  },
  registro: (req, res) => {
    res.render("registro", { title: "Registro" });
  },
  carrito: (req, res) => {
    res.render("carrito", { title: "Carrito de compras" });
  },
  store: (req, res) => {
    // idNuevo = 0;
    let errors = validationResult(req); 
    if(errors.isEmpty()) { 
      // for (let s of users) {
      //   if (idNuevo < s.id) {
      //     idNuevo = s.id;
      //   }
      // }
  
      // idNuevo++;
  
      let newUser = {
        // id: idNuevo,
        nombre: req.body.userName,
        apellido: req.body.userLastName,
        email: req.body.userEmail,
        password: bcrypt.hashSync(req.body.userPassword, 10),
        avatar: req.file.filename,
        fecha_creacion: new Date()
      };
  
      db.Users.create(newUser);
  
      // fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));
  
      res.render("login", { title: "Login" });
    } else {
    res.render("wrongForm")
  }}
};
  /*  for (let s of users) {
      if (idNuevo < s.id) {
        idNuevo = s.id;
      }
    }

    idNuevo++;

    let newUser = {
      id: idNuevo,
      first_name: req.body.userName,
      last_name: req.body.userLastName,
      email: req.body.userEmail,
      password: bcrypt.hashSync(req.body.userPassword, 10),
      image: req.file.filename,
    };

    users.push(newUser);

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "));

    res.render("login", { title: "Login" });
  },
};
/* store: (req, res) => {
    let errors = validations.req ;
    if(errors.isEmpty()) {
      let users = req.body
      userId = UserModel.create(users)
  } else {
    res.render('registro', {errors : errors.array() , old: req.body})
  }
  
} */ 

// Exportar modulo
module.exports = userController ;
