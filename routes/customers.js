const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customers');
const { customerRules, validate } = require('../validation/customers');

router.get('/', customerController.getAll);
router.get('/:id', customerController.getSingle);
router.post('/', customerRules, validate, customerController.createCustomer);
router.put('/:id', customerRules, validate, customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;