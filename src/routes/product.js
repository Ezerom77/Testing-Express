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

// Form validations (Backend)
const validations = [
    body('productName')
        .notEmpty().withMessage('El nombre del producto es obligatorio (Backend)').bail()
        .isLength({min: 5}).withMessage('El nombre del producto debe tener al menos 5 caracteres (Backend)'),
    body('productDescription')
        .notEmpty().withMessage('La descripción del producto es obligatoria (Backend)').bail()
        .isLength({min: 20}).withMessage('La descripción del producto debe tener al menos 20 caracteres (Backend)'),
    body('categorias')
        .notEmpty().withMessage('Debes seleccionar al menos una categoría (Backend)'),
    body('talle')
        .notEmpty().withMessage('Debes seleccionar al menos un talle (Backend)'),
    body('color')
        .notEmpty().withMessage('Debes seleccionar al menos un color (Backend)'),
    body('productPrice')
        .notEmpty().withMessage('Debes ingresar el precio del producto (Backend)'),
    //body('productImage')
      //  .notEmpty().withMessage('Debes seleccionar una imagen (Backend)')
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
router.put("/edit/:id", validations, productController.update);

//Delete an existing product
router.delete("/edit/:id", productController.delete);



module.exports = router;
