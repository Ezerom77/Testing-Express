const db = require("../../models");
const verificar = (lista, id) => {
  let pos = -1;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id == id) {
      pos = i;
      break;
    }
  }
  return pos;
};

const cartController = {
  index: (req, res) => {
    let cart = req.session.cart;
    let n = cart.length;
    if (n <= 0) {
      res.render('cartError');
    } else {
      res.render("cartDetail", { cart: cart });
    }
  },
  add: (req, res) => {
    let cart = req.session.cart;
    let prod = req.params.id;
    db.Products.findByPk(prod, {
      include: [
        { association: "color" },
        { association: "talle" },
        { association: "imagenes" },
      ],
    }).then(function (product) {
      let pos = verificar(cart, prod);
      if (pos == -1) {
        let datos = {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          color: product.color.descripcion,
          talle: product.talle.descripcion,
          imagen: product.imagenes[0].nombreArchivo,
        };
        cart.push(datos);
      } else {
        // res.redirect('/cart/add/'+prod)
        res.render("cartDetail", { cart: cart });
      }
      req.session.cart = cart;
      res.render("cartDetail", { cart: cart });
    });
  },
  remove: (req, res) => {
    let cart = req.session.cart;
    let prod = req.params.id;
    let aux = []; //este arreglo auxiliar es para filtrar los elementos que deben quedar en el carrito de prod
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      if (item.id != prod) {
        aux.push(item);
      }
    }
    req.session.cart = aux;
    res.render("cartDetail", { cart: aux });
  },
};
module.exports = cartController;
