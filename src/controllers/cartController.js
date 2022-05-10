const db = require("../../models");

const cartController = {
  index: (req,res) => {
      res.render('cartDetail',{
          title: 'Carrito de compras',
      })
  },
  add: (req,res) => {
    res.send('Agregar producto al carrito')
  }
}

module.exports = cartController;
