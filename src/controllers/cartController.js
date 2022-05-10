const db = require("../../models");

const cartController = {
  index: (req,res) => {
      res.render('cartDetail',{
          title: 'Carrito de compras',
      })
  },
  add: (req,res) => {
    let cart = req.session.cart;
    let prod = req.params.id;
    console.log(cart,prod)
    db.Products.findByPk(prod).then(function(product){
        cart.push(product);
        req.session.cart = cart;
        res.render('cartDetail',{cart: cart});
    })}
  }
    module.exports = cartController;
