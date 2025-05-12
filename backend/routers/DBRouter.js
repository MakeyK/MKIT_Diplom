const Router = require('express')
const router = new Router()
const AuthController = require('../controllers/AuthController')
const db = require('../db')
const checkRoleMiddleware = require('../checkRoleMiddleware')
const authMiddleware = require('../authMiddleware')
const instructorController = require('../controllers/InstruktorContoller')
const studentController = require('../controllers/StudentConroller')
const curatorController = require('../controllers/CuratorController')
const groupController = require('../controllers/GroupController')
const courseController = require('../controllers/CourseController')
const ticketController = require('../controllers/SupportTickets')
const subjectController = require('../controllers/SubjectController')
const semestrController = require('../controllers/SemestrController') 
const gradeController = require('../controllers/GradesController')

// Авторизация и регистрация (публичные маршруты)
router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)

// Преподаватели (только для админов и кураторов)
router.post('/instructors', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), instructorController.create);
router.get('/instructors', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), instructorController.getAll);
router.get('/instructors/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), instructorController.getOne);
router.put('/instructors/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), instructorController.update);
router.delete('/instructors/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN]), instructorController.delete);

// Студенты (админы, кураторы, преподаватели)
router.post('/students', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), studentController.create);
router.get('/students', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), studentController.getAll);
router.get('/students/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER, checkRoleMiddleware.ROLES.STUDENT]), studentController.getOne);
router.put('/students/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), studentController.update);
router.delete('/students/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN]), studentController.delete);
router.get('/students/group/:groupId', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), studentController.getByGroup);

// Кураторы (только для админов)
router.post('/curators', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN]), curatorController.create);
router.get('/curators', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), curatorController.getAll);
router.get('/curators/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), curatorController.getOne);
router.put('/curators/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN]), curatorController.update);
router.delete('/curators/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN]), curatorController.delete);

// Группы (админы, кураторы, преподаватели)
router.post('/groups', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), groupController.create);
router.get('/groups', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), groupController.getAll);
router.get('/groups/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), groupController.getOne);
router.put('/groups/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), groupController.update);
router.delete('/groups/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN]), groupController.delete);
router.get('/groups/course/:course', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), groupController.getByCourse);

// Курсы (админы, кураторы, преподаватели)
router.post('/courses', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), courseController.create);
router.get('/courses', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), courseController.getAll);
router.get('/courses/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), courseController.getOne);
router.put('/courses/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), courseController.update);
router.delete('/courses/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN]), courseController.delete);
router.get('/courses/search', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), courseController.searchByName);

// Тех. Поддержка Заявки (все авторизованные)
router.post('/tickets', authMiddleware, ticketController.create);
router.get('/tickets', authMiddleware, ticketController.getAll);
router.get('/tickets/:id', authMiddleware, ticketController.getOne);
router.put('/tickets/:id', authMiddleware, ticketController.update);
router.delete('/tickets/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN]), ticketController.delete);
router.get('/tickets/status/:status', authMiddleware, ticketController.getByStatus);

// Дисциплины (админы, кураторы, преподаватели)
router.post('/subjects', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), subjectController.create);
router.get('/subjects', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), subjectController.getAll);
router.get('/subjects/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), subjectController.getOne);
router.put('/subjects/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), subjectController.update);
router.delete('/subjects/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN]), subjectController.delete);
router.get('/subjects/search', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), subjectController.searchByName);

// Семестры (админы, кураторы, преподаватели)
router.post('/semestres', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), semestrController.create);
router.get('/semestres', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), semestrController.getAll);
router.get('/semestres/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), semestrController.getOne);
router.put('/semestres/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR]), semestrController.update);
router.delete('/semestres/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN]), semestrController.delete);
router.get('/semestres/current', authMiddleware, semestrController.getCurrent);

// Оценки (преподаватели могут создавать/изменять, студенты только просматривать свои)
router.post('/grades', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.TEACHER]), gradeController.create);
router.get('/grades', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), gradeController.getAll);
router.get('/grades/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER, checkRoleMiddleware.ROLES.STUDENT]), gradeController.getOne);
router.put('/grades/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.TEACHER]), gradeController.update);
router.delete('/grades/:id', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.TEACHER]), gradeController.delete);
router.get('/grades/type/:type', authMiddleware, checkRoleMiddleware([checkRoleMiddleware.ROLES.ADMIN, checkRoleMiddleware.ROLES.KURATOR, checkRoleMiddleware.ROLES.TEACHER]), gradeController.getByType);

module.exports = router