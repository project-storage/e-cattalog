const productRoutes = require('express').Router()
const productController = require('../controllers/product.controller')

productRoutes.post('',productController.insertProduct)
productRoutes.get('/all',productController.getAllProduct)

module.exports = productRoutes