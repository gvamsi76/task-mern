const express = require('express');
const router = express.Router();
const { getAllCustomers, customerSave, findCustomer, deleteCustomer } = require('../controller/Customers');

router.post('/Save', customerSave);
router.post('/GetAll', getAllCustomers);
router.get('/Get/:id', findCustomer);
router.delete('/Delete/:id', deleteCustomer);

module.exports = router;
