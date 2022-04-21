// Requires
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
		db.Colores.findAll()
		.then(colores => {
			db.Talles.findAll()
			.then(talles => {
				db.Categorias.findAll()
				.then(categorias => {
					res.render('productCreate', {title: 'Crear producto nuevo', colores, talles, categorias});
				});
			});
		});
	},

	// LLEGAMOS HASTA ACA - 20 DE ABRIL
	store: (req, res) =>{
		let nombreImagen = req.file.filename;
		let productoNuevo =  {
			id:   idNuevo,
			nombre: req.body.productName,
			descripcion: req.body.productDescription,
			//categorias: req.body.categorias,
			precio: req.body.productPrice,
			color: req.body.color,
			talle: req.body.talle,
			imagen: nombreImagen
		};
	
	
	
				idNuevo=0;

				for (let s of products){
					if (idNuevo<s.id){
						idNuevo=s.id;
					}
				}

				idNuevo++;


				

				products.push(productoNuevo);

				fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

				res.redirect('/products');

			},
		detail: (req, res) => {
			let productoSeleccionado = null;
			for (i=0;i<products.length;i++) {
			if(req.params.id == products[i].id) {
			productoSeleccionado = products[i];
					}
				}
				res.render('productDetail', {title: 'Detalle de producto', productDetail: productoSeleccionado});
		},
		edit: (req, res) => {
      let id = req.params.id;
      let productoEncontrado = null;
      for (let s of products){
        if (id==s.id){
          productoEncontrado=s;
        }
      };
      res.render('productEdit',{title: 'Editar Producto', ProductoaEditar: productoEncontrado});
    },
  update: (req, res) =>{
    let id = req.params.id;

		for (let s of products){
			if (id==s.id){
			s.name = req.body.productName;
			s.description = req.body.productDescription;
			s.categories = req.body.categorias;
			s.price = req.body.productPrice;
      		s.color = req.body.color;
      		s.talle = req.body.talle;
      		s.stock = req.body.productStock;
			//s.image = req.file.filename;
      // no se si se puede actualizar la imagen asi porque deberia uploadear via multer!
      break;
			}
		};

		fs.writeFileSync(productsFilePath, JSON.stringify(products,null,' '));

		res.redirect('/products');
  //res.send('Llegue al controlador de update via PUT')

	},
  delete: (req, res) => {
    let id = req.params.id;
		let ProductoEncontrado=null;

		let Nproducts = products.filter(function(e){
			return id!=e.id;
		})

		for (let producto of products){
			if (producto.id == id){
			    ProductoEncontrado=producto;
			}
		}

		fs.unlinkSync(path.join(__dirname, '../../public/images/products/', ProductoEncontrado.image));

		fs.writeFileSync(productsFilePath, JSON.stringify(Nproducts,null,' '));

		res.redirect('/products');
	}
  
};


// Module export
module.exports = productController;
