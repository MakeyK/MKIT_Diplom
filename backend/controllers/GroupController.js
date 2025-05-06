const ApiError = require('../ApiError');
const { Groups } = require('../models/models');

class GroupController {
    async create(req, res, next) {
        try {
            const { name_group, specialization, course_number, created_year } = req.body;
            if (!name_group || !course_number || !created_year) {
                return next(ApiError.badRequest('Необходимо заполнить обязательные поля: название группы, номер курса и год создания'));
            }
            if (course_number < 1 || course_number > 5) {
                return next(ApiError.badRequest('Номер курса должен быть от 1 до 5'));
            }
            const currentYear = new Date().getFullYear();
            if (created_year < 2020 || created_year > currentYear) {
                return next(ApiError.badRequest(`Год создания должен быть между 2020 и ${currentYear}`));
            }
            const group = await Groups.create({ name_group, specialization: specialization || null, course_number, created_year });
            return res.json(group);
        } catch (error) {
            console.error('Create group error:', error);
            return next(ApiError.internal('Ошибка при создании группы'));
        }
    }

    // Получение всех групп
    async getAll(req, res, next) {
        try {
            const groups = await Groups.findAll({
                order: [
                    ['course_number', 'ASC'],
                    ['name_group', 'ASC']
                ]
            });
            return res.json(groups);
        } catch (error) {
            console.error('Get all groups error:', error);
            return next(ApiError.internal('Ошибка при получении списка групп'));
        }
    }

    // Получение одной группы по ID
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID группы'));
            }
            const group = await Groups.findOne({
                where: { id_group: id }
            });
            if (!group) {
                return next(ApiError.notFound('Группа не найдена'));
            }
            return res.json(group);
        } catch (error) {
            console.error('Get group error:', error);
            return next(ApiError.internal('Ошибка при получении группы'));
        }
    }

    // Обновление данных группы
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { name_group, specialization, course_number, created_year } = req.body;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID группы'));
            }
            const group = await Groups.findOne({ where: { id_group: id } });
            if (!group) {
                return next(ApiError.notFound('Группа не найдена'));
            }
            if (course_number && (course_number < 1 || course_number > 5)) {
                return next(ApiError.badRequest('Номер курса должен быть от 1 до 5'));
            }
            if (created_year) {
                const currentYear = new Date().getFullYear();
                if (created_year < 2000 || created_year > currentYear) {
                    return next(ApiError.badRequest(`Год создания должен быть между 2000 и ${currentYear}`));
                }
            }

            // Обновление данных
            const updatedGroup = await Groups.update(
                {
                    name_group: name_group || group.name_group,
                    specialization: specialization !== undefined ? specialization : group.specialization,
                    course_number: course_number || group.course_number,
                    created_year: created_year || group.created_year
                },
                {
                    where: { id_group: id },
                    returning: true
                }
            );
            return res.json(updatedGroup[1][0]);
        } catch (error) {
            console.error('Update group error:', error);
            return next(ApiError.internal('Ошибка при обновлении данных группы'));
        }
    }

    // Удаление группы
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID группы'));
            }
            const group = await Groups.findOne({ where: { id_group: id } });
            if (!group) {
                return next(ApiError.notFound('Группа не найдена'));
            }
            await Groups.destroy({ where: { id_group: id } });
            return res.json({ message: 'Группа успешно удалена' });
        } catch (error) {
            console.error('Delete group error:', error);
            return next(ApiError.internal('Ошибка при удалении группы'));
        }
    }

    // Дополнительный метод: получение групп по номеру курса
    async getByCourse(req, res, next) {
        try {
            const { course } = req.params;
            const courseNumber = parseInt(course);
            if (isNaN(courseNumber) || courseNumber < 1 || courseNumber > 6) {
                return next(ApiError.badRequest('Номер курса должен быть числом от 1 до 6'));
            }
            const groups = await Groups.findAll({
                where: { course_number: courseNumber },
                order: [['name_group', 'ASC']]
            });
            return res.json(groups);
        } catch (error) {
            console.error('Get groups by course error:', error);
            return next(ApiError.internal('Ошибка при получении групп по курсу'));
        }
    }
}

module.exports = new GroupController();