const express = require('express');
const categoryRouter = express.Router();
const categoriesController = require('../controllers/category.controller');

// เส้นทางสำหรับสร้างหมวดหมู่ใหม่
categoryRouter.post('/create', categoriesController.createCategory);

// เส้นทางสำหรับดึงหมวดหมู่ทั้งหมด
categoryRouter.get('/all', categoriesController.getAllCategory);

// เส้นทางสำหรับอัปเดตหมวดหมู่ตาม ID
categoryRouter.put('/update/:id', categoriesController.updateCategory);

// เส้นทางสำหรับลบหมวดหมู่ตาม ID
categoryRouter.delete('/delete/:id', categoriesController.deleteCategory);

module.exports = categoryRouter;
