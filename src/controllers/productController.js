const db = require("../../models");
const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");


// Controllers
const productController = {
  slider: (req, res) => {
    db.Products.findAll({
      include: [
        { association: "color" },
        { association: "talle" },
        { association: "imagenes" },
      ],
    }).then(function (products) {
      res.render("productListSlider", {
        title: "Todos los productos",
        products: products,
      });
    });
  },
  list: (req, res) => {
    db.Products.findAll({
      include: [
        { association: "color" },
        { association: "talle" },
        { association: "imagenes" },
      ],
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
            colores: colores,
            talles: talles,
            categorias: categorias,
          });
        });
      });
    });
  },

  store: (req, res) => {
    const errors = validationResult(req);
    res.render(errors)
    /* if (!errors.isEmpty()) {
      return res.render("productCreate", { errors: errors.mapped() });
    } else {
      let productoNuevo = {
        nombre: req.body.productName,
        descripcion: req.body.productDescription,
        precio: req.body.productPrice,
        id_color: req.body.color,
        id_talle: req.body.talle,
      };
      db.Products.create(productoNuevo).then(function (producto) {
        for (let i = 0; i < req.files.length; i++) {
          let objeto = { id_Producto: producto.id, nombreArchivo: req.files[i].filename };
          db.imagenProducto.create(objeto);
        }
        for (let i = 0; i < req.body.categorias.length; i++) {
          let objeto2 = { id_Producto: producto.id, id_Categoria: req.body.categorias[i] };
          db.Producto_Categoria.create(objeto2);
        }
        res.redirect("/products");
      }
      );
    } */
  },

  



  /* store: async (req, res) => {
   const errors = validationResult(req);   
    if (!errors.isEmpty()) {
      return res.render("productCreate", {errors: errors.mapped() });
      } else {
      let productoNuevo = {
        nombre: req.body.productName,
        descripcion: req.body.productDescription,
        precio: req.body.productPrice,
        id_color: req.body.color,
        id_talle: req.body.talle
        }
      let x = await db.Products.create(productoNuevo)
      let idP = x.dataValues.id
        for (let i = 0; i < req.files.length; i++) {
          let objeto = { id_Producto: idP, nombreArchivo: req.files[i].filename };
          await db.imagenProducto.create(objeto)
        }
        for (let i = 0; i < req.body.categorias.length; i++) {
          let objeto2 = { id_Producto: idP, id_Categoria: req.body.categorias[i] };
          await db.Producto_Categoria.create(objeto2)
       }
        res.redirect("/products")
      }
  }, */

  detail: (req, res) => {
    db.Products.findByPk(req.params.id, {
      include: [
        { association: "color" },
        { association: "talle" },
        { association: "categorias" },
        { association: "imagenes" },
      ],
    }).then(function (producto) {
      res.render("productDetail", {
        productDetail: producto,
      });
    }
    );
  },

  edit: (req, res) => {
    let pedidoProducto = db.Products.findByPk(req.params.id);
    let pedidoTalles = db.Talles.findAll();
    let pedidoColores = db.Colores.findAll();
    let pedidoCategorias = db.Categorias.findAll();

    Promise.all([
      pedidoProducto,
      pedidoTalles,
      pedidoColores,
      pedidoCategorias,
    ]).then(function ([ProductoaEditar, talles, colores, categorias]) {
      res.render("productEdit", {
        ProductoaEditar: ProductoaEditar,
        talles: talles,
        colores: colores,
        categorias: categorias,
      });
    });
  },

  update: async (req, res) => {
    let productoAEditar = {
      nombre: req.body.productName,
      descripcion: req.body.productDescription,
      precio: req.body.productPrice,
      id_color: req.body.color,
      id_talle: req.body.talle,

    };

    await db.Products.update(productoAEditar, { where: { id: req.params.id } });
    await db.Producto_Categoria.destroy({
      where: { id_Producto: req.params.id },
    });
    for (let i = 0; i < req.body.categorias.length; i++) {
      let objeto = {
        id_Producto: req.params.id,
        id_Categoria: req.body.categorias[i],
      };
      await db.Producto_Categoria.create(objeto);
    }

    res.redirect("/products/detail/" + req.params.id);
  },

  delete: (req, res) => {
    db.imagenProducto
      .findAll({ where: { id_Producto: req.params.id } })
      .then(function (imagenes) {
        for (let i = 0; i < imagenes.length; i++) {
        fs.unlinkSync(
          path.join(
            __dirname,
            "../../public/images/products/" + imagenes[i].nombreArchivo
          )
        );}
      })
      .then(
        db.Products.destroy({
          where: { id: req.params.id },
        })
      )
      .then(function () {
        res.redirect("/products");
      });
  }
  // delete: (req, res) => {
  //   db.Products.findByPk(req.params.id)
  //     .then(function (producto) {
  //       fs.unlinkSync(
  //         path.join(__dirname, "../../public/images/products/", producto.imagen)
  //       );
  //     })

  //     .then(
  //       db.Products.destroy({
  //         where: { id: req.params.id },
  //       })
  //     )
  //     .then(function () {
  //       res.redirect("/products");
  //     });
  // },
};
module.exports = productController;
