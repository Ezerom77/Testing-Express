const db = require("../../models");
const fs = require("fs");
const path = require("path");

// Controllers
const productController = {
  list: (req, res) => {
    db.Products.findAll({
      include: [{ association: "color" }, { association: "talle" }],
    }).then(function (products) {
      res.render("productList", {
        title: "Todos los productos",
        products: products,
      });
    });
  },
  add: (req, res) => {
    db.Colores.findAll().then(function (colores) {
      db.Talles.findAll().then(function (talles) {
        db.Categorias.findAll().then(function (categorias) {
          res.render("productCreate", {
            title: "Crear Producto Nuevo",
            colores: colores,
            talles: talles,
            categorias: categorias,
          });
        });
      });
    });
  },

  store: async (req, res) => {
    let nombreImagen = req.file.filename;

    let productoNuevo = {
      nombre: req.body.productName,
      descripcion: req.body.productDescription,
      precio: req.body.productPrice,
      id_color: req.body.color,
      id_talle: req.body.talle,
      imagen: nombreImagen,
    };
    let x = await db.Products.create(productoNuevo);
    let idP = x.dataValues.id;
    for (let i = 0; i < req.body.categorias.length; i++) {
      let objeto = { id_Producto: idP, id_Categoria: req.body.categorias[i] };
      await db.Producto_Categoria.create(objeto);
    }
    res.redirect("/products");
  },
  detail: (req, res) => {
    db.Products.findByPk(req.params.id, {
      include: [{ association: "color" }, { association: "talle" }],
    }).then(function (producto) {
      res.render("productDetail", {
        title: "Detalle de producto",
        productDetail: producto,
      });
    });
  },

  edit: (req, res) => {
    let pedidoProducto = db.Products.findByPk(req.params.id);
    let pedidoTalles = db.Talles.findAll();
    let pedidoColores = db.Colores.findAll();

    Promise.all([pedidoProducto, pedidoTalles, pedidoColores]).then(function ([
      ProductoaEditar,
      talles,
      colores,
    ]) {
      res.render("productEdit", {
        title: "Editar Producto",
        ProductoaEditar: ProductoaEditar,
        talles: talles,
        colores: colores,
      });
    });
  },
  update: async (req, res) => {
    // let nombreImagen = req.file.filename;

    let productoNuevo = {
      nombre: req.body.productName,
      descripcion: req.body.productDescription,
      // id_categories: req.body.categorias,
      precio: req.body.productPrice,
      id_color: req.body.color,
      id_talle: req.body.talle,
      // imagen: nombreImagen,
    };
    await db.Products.update(productoNuevo, { where: { id: req.params.id } });
    res.redirect("/products/detail/" + req.params.id);
  },
  delete: (req, res) => {
    db.Products.findByPk(req.params.id)
      .then(function (producto) {
        fs.unlinkSync(
          path.join(__dirname, "../../public/images/products/", producto.imagen)
        );
      })
      // .then(
      //   db.Producto_Categoria.destroy({
      //     where: {
      //       id_Producto: req.params.id,
      //     },
      //   })
      // )
      .then(
        db.Products.destroy({
          where: { id: req.params.id },
        })
      )
      .then(function () {
        res.redirect("/products");
      });
  },
};
module.exports = productController;
