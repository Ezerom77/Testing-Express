// requires
var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();
const { path } = require('../app');
const {body} = require('express-validator'); 

const validations = [
    body('userName').notEmpty().withMessage("Debes completar tu nombre"),
    body('userLastName').notEmpty().withMessage("Debes completar tu apellido"),
    body('userEmail').isEmail().withMessage("Debes ingresar un email valido"), 
    body('userPassword').isLength({min: 10}).withMessage('La contraseña debe ser al menos de 10 caracteres') ,
    body('userTermsAccept').notEmpty().withMessage("Debes aceptar los terminos y condiciones para continuar")
] ;





// Routes
router.get('/', userController.usuarios);
router.get('/login',userController.login);
router.post('/login', userController.logged);
router.get('/registro',userController.registro);
router.post('/registro', validations ,userController.registered);
router.get('/carrito', userController.carrito);


// Module export
module.exports = router;
