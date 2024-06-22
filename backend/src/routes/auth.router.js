const authController = require('../controllers/auth.controller')

const authRouter = require('express').Router()

// register
authRouter.post('/register', authController.registerSale)

// register
authRouter.post('/register/admin', authController.registerAdmin)

// login
authRouter.post('/login', authController.login)

module.exports = authRouter