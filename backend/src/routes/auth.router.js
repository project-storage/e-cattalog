const authController = require('../controllers/auth.controller')

const authRouter = require('express').Router()

// register
authRouter.post('/register', authController.register)

// login
authRouter.post('/login', authController.login)

module.exports = authRouter