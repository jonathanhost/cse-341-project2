const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const { productRules, validate } = require('../validation/products');
const { isAuthenticated } = require("../middleware/authenticate")
router.get('/',  productsController.getAll);
router.get('/:id', productsController.getSingle);
router.post('/', isAuthenticated,productRules, validate, productsController.createProduct);
router.put('/:id', isAuthenticated,productRules, validate,productsController.updateProduct);
router.delete('/:id',isAuthenticated,productsController.deleteProduct);

module.exports = router;