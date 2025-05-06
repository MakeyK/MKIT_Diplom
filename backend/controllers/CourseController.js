const ApiError = require('../ApiError');
const { Courses } = require('../models/models');

class CourseController {
    async create(req, res, next) {
        try {
            const { cours_name, description, duration_years } = req.body;
            if (!cours_name || !duration_years) {
                return next(ApiError.badRequest('Необходимо заполнить обязательные поля: название курса и продолжительность'));
            }
            if (duration_years < 1 || duration_years > 5) {
                return next(ApiError.badRequest('Продолжительность курса должна быть от 1 до 5 лет'));
            }
            const course = await Courses.create({ cours_name, description: description || null, duration_years });
            return res.json(course);
        } catch (error) {
            console.error('Create course error:', error);
            return next(ApiError.internal('Ошибка при создании курса'));
        }
    }

    // Получение всех курсов
    async getAll(req, res, next) {
        try {
            const courses = await Courses.findAll({
                order: [['cours_name', 'ASC']]
            });
            return res.json(courses);
        } catch (error) {
            console.error('Get all courses error:', error);
            return next(ApiError.internal('Ошибка при получении списка курсов'));
        }
    }

    // Получение одного курса по ID
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID курса'));
            }
            const course = await Courses.findOne({
                where: { id_course: id }
            });
            if (!course) {
                return next(ApiError.notFound('Курс не найден'));
            }
            return res.json(course);
        } catch (error) {
            console.error('Get course error:', error);
            return next(ApiError.internal('Ошибка при получении курса'));
        }
    }

    // Обновление данных курса
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { cours_name, description, duration_years } = req.body;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID курса'));
            }
            const course = await Courses.findOne({ where: { id_course: id } });
            if (!course) {
                return next(ApiError.notFound('Курс не найден'));
            }
            if (duration_years && (duration_years < 1 || duration_years > 5)) {
                return next(ApiError.badRequest('Продолжительность курса должна быть от 1 до 5 лет'));
            }

            // Обновление данных
            const updatedCourse = await Courses.update(
                {
                    cours_name: cours_name || course.cours_name,
                    description: description !== undefined ? description : course.description,
                    duration_years: duration_years || course.duration_years
                },
                {
                    where: { id_course: id },
                    returning: true
                }
            );

            return res.json(updatedCourse[1][0]);
        } catch (error) {
            console.error('Update course error:', error);
            return next(ApiError.internal('Ошибка при обновлении данных курса'));
        }
    }

    // Удаление курса
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID курса'));
            }
            const course = await Courses.findOne({ where: { id_course: id } });
            if (!course) {
                return next(ApiError.notFound('Курс не найден'));
            }
            await Courses.destroy({ where: { id_course: id } });
            return res.json({ message: 'Курс успешно удален' });
        } catch (error) {
            console.error('Delete course error:', error);
            return next(ApiError.internal('Ошибка при удалении курса'));
        }
    }

    // Дополнительный метод: поиск курсов по названию
    async searchByName(req, res, next) {
        try {
            const { name } = req.query;
            if (!name) {
                return next(ApiError.badRequest('Не указано название для поиска'));
            }

            const courses = await Courses.findAll({
                where: {
                    cours_name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                order: [['cours_name', 'ASC']]
            });

            return res.json(courses);
        } catch (error) {
            console.error('Search courses error:', error);
            return next(ApiError.internal('Ошибка при поиске курсов'));
        }
    }
}

module.exports = new CourseController();