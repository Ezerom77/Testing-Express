// requires
var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();
const path  = require('path');
const {body} = require('express-validator');
const multer = require('multer');
let guestMiddleware = require('../middlewares/guestMiddleware');
let loggedMiddleware = require('../middlewares/loggedMiddleware');

//configuracion de multer
const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null, path.join(__dirname, '../../public/images/profileImages' ));
    },
    filename: function(req, file, cb){
        let imageName = Date.now() + path.extname(file.originalname);
        cb(null, imageName);
    }
});
const uploadFile = multer({storage});

//validaciones de formulario de Registro

const validations = [
    body('userName').notEmpty().withMessage("Debes completar tu nombre"),
    body('userLastName').notEmpty().withMessage("Debes completar tu apellido"),
    body('userEmail').isEmail().withMessage("Debes ingresar un email valido"),
    body('userPassword').isLength({min: 10}).withMessage('La contraseña debe ser al menos de 10 caracteres'),
    body('userTermsAccept').notEmpty().withMessage("Debes aceptar los terminos y condiciones para continuar")
] ; 





// Routes
router.get('/', userController.usuarios);
router.get('/perfil', loggedMiddleware, userController.perfil);
router.get('/login', guestMiddleware, userController.login);
router.post('/login', userController.logged);
router.get('/registro', guestMiddleware, userController.registro);
router.post('/registro', uploadFile.single('profilePic'), validations , userController.store); 
router.get('/carrito', userController.carrito);


// Module export
module.exports = router;
