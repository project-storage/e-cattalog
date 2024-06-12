const express = require('express');
const productRoutes = express.Router();
const productController = require('../controllers/product.controller');
const formidable = require('express-formidable');

// Route สำหรับสร้างสินค้า
productRoutes.post('/create', formidable(), productController.createProduct);

// Route สำหรับดึงสินค้าทั้งหมด
productRoutes.get('/all', productController.getAllProduct);

// Route สำหรับดึงสินค้าตาม ID
productRoutes.get('/byId/:slug', productController.getProductById);

// Route สำหรับอัปเดตสินค้า
productRoutes.put('/update/:id', formidable(), productController.updateProduct);

// Route สำหรับลบสินค้า
productRoutes.delete('/delete/:id', productController.deleteProduct);

module.exports = productRoutes;
