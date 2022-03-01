// Requires
const fs = require('fs');
const path = require('path');

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
  registered: (req, res) => {
    res.send('Te registraste')
  },
  carrito: (req, res) => {
    res.render('carrito', { title: 'Carrito de compras' });
  }
}

// Exportar modulo
module.exports = userController;
