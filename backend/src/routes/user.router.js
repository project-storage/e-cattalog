const userController = require('../controllers/user.controller');
const userRouter = require('express').Router();

// เส้นทางสำหรับการดึงข้อมูลผู้ใช้ทั้งหมด
userRouter.get('/all',userController.getAllUsers);

module.exports = userRouter;
