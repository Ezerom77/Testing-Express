// Requires
const express = require("express");
const router = express.Router();
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



// Get all products
router.get("/", productController.list);

// Create a new product
router.get("/create", productController.add);
router.post("/create", uploadFile.array('productImage',4), productController.store);

// Get one product
router.get("/detail/:id", productController.detail);

// Edit an existing product
router.get("/edit/:id", productController.edit);
router.put('/edit/:id', productController.update);

//Delete an existing product
router.delete("/edit/:id", productController.delete);



module.exports = router;
