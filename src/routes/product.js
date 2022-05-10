// Requires
const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const multer = require ('multer');
const path = require ('path');
const productController = require("../controllers/productController");

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
const validations = [
    body('productName')
        .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
        .isLength({min: 5}).withMessage('El nombre del producto debe tener al menos 5 caracteres'),
    body('productDescription')
        .isLength({min: 20}).withMessage('La descripción del producto debe tener al menos 20 caracteres'),
    body('categorias')
        .notEmpty().withMessage('Debes seleccionar al menos una categoría'),
    body('talle')
        .notEmpty().withMessage('Debes seleccionar al menos un talle'),
    body('color')
        .notEmpty().withMessage('Debes seleccionar al menos un color'),
    body('productPrice')
        .notEmpty().withMessage('Debes ingresar el precio del producto'),
    body('productImage')
        .notEmpty().withMessage('Debes ingresar al menos una imagen del producto')
        .custom((value, {req}) => {
            let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
            if(acceptedExtensions.includes(path.extname(file.originalname))){
            return 'true'; // return "non-falsy" value to indicate valid data"
            }else{
            return false; // return "falsy" value to indicate invalid data
            }
        }).withMessage('Solo se aceptan archivos jpeg, jpg, png y pdf'),

];

// Routes
// Get all products
router.get("/", productController.list);
router.get("/slider", productController.slider);

// Create a new product
router.get("/create", productController.add);
router.post("/create", uploadFile.array('productImage',4), validations, productController.store);

// Get one product
router.get("/detail/:id", productController.detail);

// Edit an existing product
router.get("/edit/:id", productController.edit);
router.put('/edit/:id', productController.update);

//Delete an existing product
router.delete("/edit/:id", productController.delete);



module.exports = router;
