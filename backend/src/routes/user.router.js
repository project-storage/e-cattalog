const {  getAllUsers, searchUserByRole } = require('../controllers/user.controller');
const userRouter = require('express').Router();

// เส้นทางสำหรับการดึงข้อมูลผู้ใช้ทั้งหมด
userRouter.get('/all', getAllUsers);

// เส้นทางสำหรับการค้นหาผู้ใช้ตามบทบาท
userRouter.get('/search', searchUserByRole);

module.exports = userRouter;
