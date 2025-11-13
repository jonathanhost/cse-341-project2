const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customers');
router.get('/', customerController.getAll);
router.get('/:id', customerController.getSingle);
router.post('/', customerController.createCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;