const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customers');
const { customerRules, validate } = require('../validation/customers');
const { isAuthenticated } = require("../middleware/authenticate")

router.get('/', customerController.getAll);
router.get('/:id', customerController.getSingle);
router.post('/', isAuthenticated, customerRules, validate, customerController.createCustomer);
router.put('/:id',isAuthenticated, customerRules, validate, customerController.updateCustomer);
router.delete('/:id', isAuthenticated, customerController.deleteCustomer);

module.exports = router;