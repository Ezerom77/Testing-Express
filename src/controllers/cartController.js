const db = require("../../models");
const mercadopago = require('mercadopago');
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
    let cartValue = req.session.cartValue;
    let n = cart.length;
    if (n <= 0) {
      res.render("cartError");
    } else {
      res.render("cartDetail", { cart: cart, cartValue: cartValue });
    }
  },
  add: (req, res) => {
    let cart = req.session.cart;
    let prod = req.params.id;
    let cartValue = req.session.cartValue;
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
          descripcion: product.descripcion,
          precio: product.precio,
          color: product.color.descripcion,
          talle: product.talle.descripcion,
          imagen: product.imagenes[0].nombreArchivo,
        };
        cartValue = cartValue + Number(product.precio);
        req.session.cartValue = cartValue;
        cart.push(datos);
      } else {
        // res.redirect('/cart/add/'+prod)
        return res.render("cartDetail", { cart: cart, cartValue: cartValue });
      }
      req.session.cart = cart;
      res.render("cartDetail", { cart: cart, cartValue: cartValue });
    });
  },
  remove: (req, res) => {
    let cart = req.session.cart;
    let prod = req.params.id;
    let newValue = 0;
    let aux = []; //este arreglo auxiliar es para filtrar los elementos que deben quedar en el carrito de prod, mejorable con filter probablemente.
    for (let i = 0; i < cart.length; i++) {
      let item = cart[i];
      if (item.id != prod) {
        aux.push(item);
        newValue = newValue + Number(item.precio);
      }
    }
    req.session.cart = aux;
    req.session.cartValue = newValue;
    res.render("cartDetail", { cart: aux, cartValue: newValue });
  },
  removeAll: (req, res) => {
    req.session.cart = [];
    req.session.cartValue = 0;
    res.render("cartError");
  },
  checkout: (req, res) => {
    let cart = req.session.cart;
    let cartValue = req.session.cartValue;
    res.render("cartCheckout", { cart: cart, cartValue: cartValue });
  },
  payout: (req, res) => {
    let cartValue = req.session.cartValue;
    let preference = {
        items: [
          {
            title: "Compra en Clessidra",
            unit_price: parseInt(cartValue),
            quantity: 1,
          }
        ],
        back_urls: {
          success: "http://dh-g9-clessidra.herokuapp.com/cart/end",
          failure: "http://dh-g9-clessidra.herokuapp.com/cart/end",
          pending: "http://dh-g9-clessidra.herokuapp.com/cart/end"
        }
      };
      mercadopago.preferences.create(preference)
        .then(function (response) {
          res.redirect(response.body.init_point);
        }).catch(function (error) {
          console.log(error);
        });
  },
  end: (req, res) => {
    res.render('cartEnd');
  }
};
module.exports = cartController;
