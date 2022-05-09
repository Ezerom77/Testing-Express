// Requires
const express = require("express");
const router = express.Router();
const multer = require ('multer');
const path = require ('path');
const productController = require("../controllers/productController");
const {body} = require('express-validator');

// configuracion de multer
const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb (null, path.join(__dirname, '../../public/images/products'))
    },
    filename : (req, file, cb) => {
        let newFilename = Date.now() + file.originalname;
        cb(null, newFilename);
    }

});

const uploadFile = multer ({storage: storage});

// Form validations
const productValidations = [
    body('productName')
        .notEmpty().withMessage("Debes completar el nombre del producto").bail()
        .isLength({min: 5}).withMessage("El nombre del producto debe tener al menos 5 caracteres"),
    body('productDescription').isLength({min: 20}).withMessage("La descripción del producto debe tener al menos 20 caracteres"),
    body('categorias').notEmpty().withMessage("Debes seleccionar al menos una categoría"),
    body('talle').notEmpty().withMessage("Debes seleccionar un talle"),
    body('color').notEmpty().withMessage('Debes seleccionar un color'),
    body('productPrice').notEmpty().withMessage("Debes ingresar el precio del producto"),
    body('productImage').custom((value, {req}) => {
        let file = req.file
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        if (!file) {
            throw new Error('Debes subir una imagen');
        } else {
            if (!acceptedExtensions.includes(path.extname(file.originalname))) {
            throw new Error('Solo se permiten imagenes con extensiones ${acceptedExtensions.join(', ')}');
            }
        }
        return true;

        })
]; 



// Get all products
router.get("/", productController.list);

// Create a new product
router.get("/create", productController.add);
router.post("/create", uploadFile.array('productImage',4), productValidations, productController.store);

// Get one product
router.get("/detail/:id", productController.detail);

// Edit an existing product
router.get("/edit/:id", productController.edit);
router.put('/edit/:id', productController.update);

//Delete an existing product
router.delete("/edit/:id", productController.delete);



module.exports = router;
