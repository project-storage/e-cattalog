const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/auth');
const userRouter = require('express').Router();

userRouter.get('/info', authenticateToken, userController.getUserInfo)

// Route for getting all users
userRouter.get('/all', userController.getAllUsers);

// Route for searching users by role
userRouter.get('/search', userController.searchUserByRole);

// Route for getting a user by ID
userRouter.get('/:id', userController.getUserById);

// Route for updating a user by ID
userRouter.put('/:id', userController.updateUser);

// Route for deleting a user by ID
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
