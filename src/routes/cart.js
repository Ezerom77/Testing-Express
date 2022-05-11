// Requires
var express = require('express');
const cartController = require('../controllers/cartController');
var router = express.Router();
// const multer = require ('multer');

/* Main routes */
router.get('/add/:id',cartController.add);
router.get('/remove/:id',cartController.remove);
router.get('/',cartController.index);

module.exports = router;
