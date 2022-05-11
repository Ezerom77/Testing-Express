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
    res.send("todavia no esta definida esta vista");
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
    let pos = verificar(cart, prod);
    let dato = cart[pos];
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

//Metodo anterior donde duplicaba el producto en el carrito
// add: (req, res) => {
//   let cart = req.session.cart;
//   let prod = req.params.id;
//   db.Products.findByPk(prod, {
//     include: [
//       { association: "color" },
//       { association: "talle" },
//       { association: "imagenes" },
//     ],
//   }).then(function (product) {
//     cart.push(product);
//     req.session.cart = cart;
//     res.render("cartDetail", { cart: cart });
//   });
// },
