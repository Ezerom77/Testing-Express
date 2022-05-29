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
    body('userName').notEmpty().withMessage("Debes completar tu nombre (Backend)"),
    body('userLastName').notEmpty().withMessage("Debes completar tu apellido (Backend)"),
    body('userEmail').isEmail().withMessage("Debes ingresar un email válido (Backend)"),
    body('userPassword').isLength({min: 10}).withMessage('La contraseña debe tener al menos 10 caracteres (Backend)'),
    body('userTermsAccept').notEmpty().withMessage("Debes aceptar los términos y condiciones para continuar (Backend)")
] ;

const loginValidations = [
    body('email')
        .notEmpty().withMessage("* Por favor ingresa tu correo electrónico (Backend)").bail()
        .isEmail().withMessage("* No es un formato de email válido (Backend)"),
    body('password').notEmpty().withMessage("* Por favor ingresa tu contraseña (Backend)")
]

// Routes
router.get('/', userController.usuarios);
router.get('/perfil', loggedMiddleware, userController.perfil);
router.get('/login', guestMiddleware, userController.login);
router.post('/login', loginValidations, userController.logged);
router.get('/registro', guestMiddleware, userController.registro);
router.post('/registro', uploadFile.single('profilePic'), validations , userController.store);
router.post('/logout', userController.logout);
router.get('/edit',loggedMiddleware, userController.edit)
router.post('/edit',loggedMiddleware, userController.update)


// Module export
module.exports = router;
