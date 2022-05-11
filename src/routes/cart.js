// Requires
var express = require('express');
const cartController = require('../controllers/cartController');
var router = express.Router();
// const multer = require ('multer');

/* Main routes */
router.get('/add/:id',cartController.add);
router.get('/remove/:id',cartController.remove);
router.get('/removeAll',cartController.removeAll);
router.get('/checkout',cartController.checkout);
router.get('/payout',cartController.payout)
router.get('/end',cartController.end)
router.get('/',cartController.index);

module.exports = router;
