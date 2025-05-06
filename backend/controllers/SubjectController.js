const ApiError = require('../ApiError');
const { Subjects } = require('../models/models');

class SubjectController {
    async create(req, res, next) {
        try {
            const { subject_name, hours_total, description } = req.body;
            if (!subject_name || !hours_total) {
                return next(ApiError.badRequest('Необходимо заполнить обязательные поля: название предмета и общее количество часов'));
            }
            if (hours_total <= 0) {
                return next(ApiError.badRequest('Количество часов должно быть положительным числом'));
            }
            const subject = await Subjects.create({ subject_name, hours_total, description: description || null });
            return res.json(subject);
        } catch (error) {
            console.error('Create subject error:', error);
            return next(ApiError.internal('Ошибка при создании предмета'));
        }
    }

    // Получение всех предметов
    async getAll(req, res, next) {
        try {
            const subjects = await Subjects.findAll({
                order: [['subject_name', 'ASC']]
            });
            return res.json(subjects);
        } catch (error) {
            console.error('Get all subjects error:', error);
            return next(ApiError.internal('Ошибка при получении списка предметов'));
        }
    }

    // Получение одного предмета по ID
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID предмета'));
            }
            const subject = await Subjects.findOne({
                where: { id_subject: id }
            });
            if (!subject) {
                return next(ApiError.notFound('Предмет не найден'));
            }
            return res.json(subject);
        } catch (error) {
            console.error('Get subject error:', error);
            return next(ApiError.internal('Ошибка при получении предмета'));
        }
    }

    // Обновление данных предмета
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { subject_name, hours_total, description } = req.body;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID предмета'));
            }
            const subject = await Subjects.findOne({ where: { id_subject: id } });
            if (!subject) {
                return next(ApiError.notFound('Предмет не найден'));
            }
            if (hours_total && hours_total <= 0) {
                return next(ApiError.badRequest('Количество часов должно быть положительным числом'));
            }
            const updatedSubject = await Subjects.update(
                {
                    subject_name: subject_name || subject.subject_name,
                    hours_total: hours_total || subject.hours_total,
                    description: description !== undefined ? description : subject.description
                },
                {
                    where: { id_subject: id },
                    returning: true
                }
            );
            return res.json(updatedSubject[1][0]);
        } catch (error) {
            console.error('Update subject error:', error);
            return next(ApiError.internal('Ошибка при обновлении данных предмета'));
        }
    }

    // Удаление предмета
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID предмета'));
            }
            const subject = await Subjects.findOne({ where: { id_subject: id } });
            if (!subject) {
                return next(ApiError.notFound('Предмет не найден'));
            }
            await Subjects.destroy({ where: { id_subject: id } });
            return res.json({ message: 'Предмет успешно удален' });
        } catch (error) {
            console.error('Delete subject error:', error);
            return next(ApiError.internal('Ошибка при удалении предмета'));
        }
    }

    // Дополнительный метод: поиск предметов по названию
    async searchByName(req, res, next) {
        try {
            const { name } = req.query;
            if (!name) {
                return next(ApiError.badRequest('Не указано название для поиска'));
            }
            const subjects = await Subjects.findAll({
                where: {
                    subject_name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                order: [['subject_name', 'ASC']]
            });
            return res.json(subjects);
        } catch (error) {
            console.error('Search subjects error:', error);
            return next(ApiError.internal('Ошибка при поиске предметов'));
        }
    }
}

module.exports = new SubjectController();