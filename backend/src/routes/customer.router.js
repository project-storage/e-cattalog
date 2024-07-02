const customerController = require('../controllers/customer.controller')
const customerRouter = require('express').Router()

customerRouter.get('/all', customerController.getAllCustomer)
customerRouter.get('/info/:id', customerController.getCustomerById)

customerRouter.post('/create', customerController.createCustomer)
customerRouter.put('/update/:id', customerController.updateCustomer)

customerRouter.delete('/delete/:id', customerController.deleteCustomer)

module.exports = customerRouter