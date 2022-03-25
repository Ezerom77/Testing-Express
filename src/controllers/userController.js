// Requires
const fs = require('fs');
const path = require('path');
const {validator} = require('express-validator'); 
const bcrypt = require('bcryptjs')

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

// Controladores
let userController = {
  usuarios: (req, res) => {
    res.render('usersList', {title: 'Todos los usuarios', users: users});
    },
  perfil: (req, res) => {
    res.render('perfil', { title: 'Editar Perfil' })
  },
  login: (req, res) => {
    res.render('login', { title: 'Login' })
  },
  logged: (req, res) => {
    res.send('te logueaste')
  },
  registro: (req, res) => {
    res.render('registro', { title: 'Registro' })
  },
  carrito: (req, res) => {
    res.render('carrito', { title: 'Carrito de compras' });
  }, 
  store: (req, res) =>{
    idNuevo=0;

      for (let s of users){
        if (idNuevo<s.id){
          idNuevo=s.id;
        }
      }

      idNuevo++;

      let newUser =  {
        id:   idNuevo,
        first_name: req.body.userName ,
        last_name: req.body.userLastName,
        email: req.body.userEmail,
        password: bcrypt.hashSync((req.body.userPassword), 10),
        image: req.file.filename
      };

      users.push(newUser);

      fs.writeFileSync(usersFilePath, JSON.stringify(users,null,' '));

      res.render('login', { title: 'Login' });

    }
}
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
module.exports = userController;
