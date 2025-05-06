const ApiError = require('../ApiError');
const { Instructors } = require('../models/models');

class InstructorController {
    async create(req, res, next) {
        try {
            const { first_name, last_name, patronymic, departament, phone_number } = req.body;

            if (!first_name || !last_name || !departament) {
                return next(ApiError.badRequest('Необходимо заполнить обязательные поля: имя, фамилия и кафедра'));
            }

            const instructor = await Instructors.create({
                first_name,
                last_name,
                patronymic: patronymic || null,
                departament,
                phone_number: phone_number || null
            });

            return res.json(instructor);
        } catch (error) {
            console.error('Create instructor error:', error);
            return next(ApiError.internal('Ошибка при создании преподавателя'));
        }
    }

    // Получение всех преподавателей
    async getAll(req, res, next) {
        try {
            const instructors = await Instructors.findAll({
                order: [['last_name', 'ASC']]
            });
            return res.json(instructors);
        } catch (error) {
            console.error('Get all instructors error:', error);
            return next(ApiError.internal('Ошибка при получении списка преподавателей'));
        }
    }

    // Получение одного преподавателя по ID
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID преподавателя'));
            }

            const instructor = await Instructors.findOne({
                where: { id_instructor: id }
            });

            if (!instructor) {
                return next(ApiError.notFound('Преподаватель не найден'));
            }

            return res.json(instructor);
        } catch (error) {
            console.error('Get instructor error:', error);
            return next(ApiError.internal('Ошибка при получении преподавателя'));
        }
    }

    // Обновление данных преподавателя
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { first_name, last_name, patronymic, departament, phone_number } = req.body;

            if (!id) {
                return next(ApiError.badRequest('Не указан ID преподавателя'));
            }

            const instructor = await Instructors.findOne({ where: { id_instructor: id } });
            if (!instructor) {
                return next(ApiError.notFound('Преподаватель не найден'));
            }

            const updatedInstructor = await Instructors.update(
                {
                    first_name: first_name || instructor.first_name,
                    last_name: last_name || instructor.last_name,
                    patronymic: patronymic || instructor.patronymic,
                    departament: departament || instructor.departament,
                    phone_number: phone_number || instructor.phone_number
                },
                {
                    where: { id_instructor: id },
                    returning: true
                }
            );

            return res.json(updatedInstructor[1][0]);
        } catch (error) {
            console.error('Update instructor error:', error);
            return next(ApiError.internal('Ошибка при обновлении данных преподавателя'));
        }
    }

    // Удаление преподавателя
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID преподавателя'));
            }

            const instructor = await Instructors.findOne({ where: { id_instructor: id } });
            if (!instructor) {
                return next(ApiError.notFound('Преподаватель не найден'));
            }

            await Instructors.destroy({ where: { id_instructor: id } });
            return res.json({ message: 'Преподаватель успешно удален' });
        } catch (error) {
            console.error('Delete instructor error:', error);
            return next(ApiError.internal('Ошибка при удалении преподавателя'));
        }
    }
}

module.exports = new InstructorController();