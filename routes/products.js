const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products');
const { productRules, validate } = require('../validation/products');
router.get('/',  productsController.getAll);
router.get('/:id', productsController.getSingle);
router.post('/', productRules, validate, productsController.createProduct);
router.put('/:id', productRules, validate,productsController.updateProduct);
router.delete('/:id',productsController.deleteProduct);

module.exports = router;