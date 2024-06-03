const { createRole, searchRole, updateRole, deleteRole, getAllRoles } = require('../controllers/role.controller');
const roleRouter = require('express').Router();

// เส้นทางสำหรับการสร้างบทบาท
roleRouter.post('/create', createRole);

// เส้นทางสำหรับการอัปเดตบทบาท
roleRouter.put('/update/:id', updateRole);

// เส้นทางสำหรับการลบบทบาท
roleRouter.delete('/delete/:id', deleteRole);

// เส้นทางสำหรับเรียกดูบทบาททั้งหมด
roleRouter.get('/all', getAllRoles);

module.exports = roleRouter;
