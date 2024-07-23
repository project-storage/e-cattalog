const orderController = require('../controllers/order.controller')
const authToken = require('../middleware/auth')
const orderRouter = require('express').Router()

// Create a new order
orderRouter.post('/create',authToken, orderController.createOrder);

// Retrieve all orders
orderRouter.get('/all', orderController.getAllOrders);

orderRouter.get('/search', orderController.searchStatus);

orderRouter.get('/search/customer/:customer',orderController.searchByCustomer)

// Retrieve a single order by id
orderRouter.get('/info/:id', orderController.getOrderById);

// Update a single order by id
orderRouter.put('/update/:id', orderController.updateOrder);

// Delete a single order by id
orderRouter.delete('/delete/:id', orderController.deleteOrder);

module.exports = orderRouter