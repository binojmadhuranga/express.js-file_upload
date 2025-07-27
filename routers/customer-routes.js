const express = require('express');
const router = express.Router();

const{ updateCustomer,
  deleteCustomer,
  getCustomer,
  getCustomerByid,
  createCustomer
} = require('../controller/customer-controller');


router.get('/', getCustomer);
router.post('/', createCustomer);
router.get('/:id', getCustomerByid);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);


module.exports = router; 