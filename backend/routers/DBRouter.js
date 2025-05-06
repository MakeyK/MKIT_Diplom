const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/AuthController')
const db = require('../db')
const checkRoleMiddleware = require('../checkRoleMiddleware')
const authMiddleware = require('../authMiddleware')

// Авторизация и регистрация
router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)

// Преподаватели
router.post('/instructors', instructorController.create);
router.get('/instructors', instructorController.getAll);
router.get('/instructors/:id', instructorController.getOne);
router.put('/instructors/:id', instructorController.update);
router.delete('/instructors/:id', instructorController.delete);

// Студенты
router.post('/students', studentController.create);
router.get('/students', studentController.getAll);
router.get('/students/:id', studentController.getOne);
router.put('/students/:id', studentController.update);
router.delete('/students/:id', studentController.delete);
router.get('/students/group/:groupId', studentController.getByGroup);

module.exports = router