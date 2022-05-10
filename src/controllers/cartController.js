const db = require("../../models");

const cartController = {
  index: (req, res) => {
    res.send("todavia no esta definida esta vista")
  },
  add: (req, res) => {
    let cart = req.session.cart;
    let prod = req.params.id;
    console.log(cart, prod);
    db.Products.findByPk(prod, {
      include: [
        { association: "color" },
        { association: "talle" },
        { association: "categorias" },
        { association: "imagenes" },
      ],
    }).then(function (product) {
      cart.push(product);
      req.session.cart = cart;
      res.render("cartDetail", { cart: cart });
    });
  },
};
module.exports = cartController;
