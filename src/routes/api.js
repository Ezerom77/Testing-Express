// Requires
const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/", apiController.index);
router.get("/usersCount", apiController.usersCount);
router.get("/lastUser", apiController.lastUser);
router.get('/productsCount',apiController.productsCount);
router.get('/lastProduct',apiController.lastProduct);


module.exports = router;
