const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/AuthController')
const db = require('../db')
const checkRoleMiddleware = require('../checkRoleMiddleware')

// Авторизация и регистрация
router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)


module.exports = router