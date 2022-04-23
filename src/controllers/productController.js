// Requires
const { promiseImpl } = require('ejs');
const fs = require('fs');
const path = require('path');
const db = require('../../models');


// Controllers
const productController = {
  	list: (req, res) => {
		db.Products.findAll({
		include: [
			{association: 'color'},
			{association: 'talle'}
//			{association: 'categoria'},
//			{association: 'productoCategoria'},
		]})
		.then(products => {
		res.render('productList', {title: 'Listado de productos', products});
		})
	},

  	add: (req, res) => {
		let colores = db.Colores.findAll();
		let talles = db.Talles.findAll();
		let categorias = db.Categorias.findAll();

		Promise.all([colores, talles, categorias])
		.then (function([colores, talles, categorias]) {
			res.render('productCreate', {title: 'Crear producto nuevo', colores: colores, talles: talles, categorias: categorias});
		})
	},

	store: async (req, res) =>{

		let productoNuevo =  {
			nombre: req.body.productName,
			descripcion: req.body.productDescription,
			precio: req.body.productPrice,
			id_color: req.body.color,
			id_talle: req.body.talle,
			imagen: req.file.filename
		};
		let x = await db.Products.create(productoNuevo);
		
		let idP = x.dataValues.id;

		for (let i = 0; i < req.body.categorias.length; i++) {
			let objeto = {
				id_Producto: idP,
				id_Categoria: req.body.categorias[i]
			};
			await db.Producto_Categoria.create(objeto);
		};
		res.redirect('/products');
	},

	detail: (req, res) => {
		db.Products.findByPk(req.params.id, {
			include: [
				{association: 'color'},
				{association: 'talle'}
	// DEFINIR COMO ARREGLAR LAS MULTIPLES CATEGORIAS			{association: 'categoria'}
			],
		})
		.then(producto => {
			res.render('productDetail', {title: 'Detalle del producto', productDetail: producto});
		})
	},

	edit: (req, res) => {
		let pedidoProducto = db.Products.findByPk(req.params.id)
		let pedidoTalles = db.Talles.findAll()
		let pedidoColores = db.Colores.findAll()
	//	let pedidoCategorias = db.Categorias.findAll()

		Promise.all([pedidoProducto, pedidoTalles, pedidoColores])
		.then(function([ProductoaEditar, talles, colores]) {
			res.render('productEdit', {title: 'Editar producto', ProductoaEditar: ProductoaEditar, talles: talles, colores: colores});
		}) 
    },

  	update: async (req, res) =>{
    	let productoEditado = {
			nombre: req.body.productName,
			descripcion: req.body.productDescription,
			precio: req.body.productPrice,
			id_color: req.body.color,
			id_talle: req.body.talle,
		};
		await db.Products.update(productoEditado, {
			where: {
				id: req.params.id
			}
			})
		res.redirect('/products/detail/' + req.params.id); 	
	},

	delete: (req, res) => {
		db.Products.findByPk(req.params.id)
			.then(function (producto) {
				fs.unlinkSync(
					  path.join(__dirname, "../../public/images/products/", producto.imagen)
					);
				  })
			.then(db.Producto_Categoria.destroy({
				where: {
					id_Producto: req.params.id
				}}))
			.then(db.Products.destroy({
				where: { id: req.params.id },
					})
				  );
				res.redirect("/products");
	},
}

// Module export
module.exports = productController;
