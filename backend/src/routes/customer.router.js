const customerController = require('../controllers/customer.controller')
const authToken = require('../middleware/auth')
const customerRouter = require('express').Router()

customerRouter.get('/sale',authToken, customerController.getInfoCustomer)
customerRouter.get('/all', customerController.getAllCustomer)
customerRouter.get('/info/:id', customerController.getCustomerById)

customerRouter.post('/create', customerController.createCustomer)
customerRouter.put('/update/:id', customerController.updateCustomer)

customerRouter.delete('/delete/:id', customerController.deleteCustomer)

module.exports = customerRouter