const productRoutes = require('express').Router()
const productController = require('../controllers/product.controller')
const formidable = require('express-formidable')

productRoutes.post('/create',formidable(), productController.createProduct)

productRoutes.get('/all',productController.getAllProduct)
module.exports = productRoutes