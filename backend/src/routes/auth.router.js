const { register, login } = require('../controllers/auth.controller')

const authRouter = require('express').Router()

// register
authRouter.post('/register',register)

// login
authRouter.post('/login',login)

module.exports = authRouter