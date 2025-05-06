const ApiError = require('../ApiError');
const { Semestres } = require('../models/models');

class SemestrController {
    async create(req, res, next) {
        try {
            const { semestr_name, start_date, end_date } = req.body;
            if (!semestr_name || !start_date || !end_date) {
                return next(ApiError.badRequest('Необходимо заполнить все обязательные поля: название семестра, дата начала и дата окончания'));
            }
            const startDate = new Date(start_date);
            const endDate = new Date(end_date);
            if (startDate >= endDate) {
                return next(ApiError.badRequest('Дата окончания должна быть позже даты начала'));
            }
            const semestr = await Semestres.create({ semestr_name, start_date: startDate, end_date: endDate });
            return res.json(semestr);
        } catch (error) {
            console.error('Create semestr error:', error);
            return next(ApiError.internal('Ошибка при создании семестра'));
        }
    }

    // Получение всех семестров
    async getAll(req, res, next) {
        try {
            const semestres = await Semestres.findAll({
                order: [['start_date', 'DESC']]
            });
            return res.json(semestres);
        } catch (error) {
            console.error('Get all semestres error:', error);
            return next(ApiError.internal('Ошибка при получении списка семестров'));
        }
    }

    // Получение одного семестра по ID
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID семестра'));
            }
            const semestr = await Semestres.findOne({
                where: { id_semestr: id }
            });
            if (!semestr) {
                return next(ApiError.notFound('Семестр не найден'));
            }
            return res.json(semestr);
        } catch (error) {
            console.error('Get semestr error:', error);
            return next(ApiError.internal('Ошибка при получении семестра'));
        }
    }

    // Обновление данных семестра
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { semestr_name, start_date, end_date } = req.body;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID семестра'));
            }
            const semestr = await Semestres.findOne({ where: { id_semestr: id } });
            if (!semestr) {
                return next(ApiError.notFound('Семестр не найден'));
            }
            const newStartDate = start_date ? new Date(start_date) : new Date(semestr.start_date);
            const newEndDate = end_date ? new Date(end_date) : new Date(semestr.end_date);
            if (newStartDate >= newEndDate) {
                return next(ApiError.badRequest('Дата окончания должна быть позже даты начала'));
            }
            const updatedSemestr = await Semestres.update(
                {
                    semestr_name: semestr_name || semestr.semestr_name,
                    start_date: newStartDate,
                    end_date: newEndDate
                },
                {
                    where: { id_semestr: id },
                    returning: true
                }
            );
            return res.json(updatedSemestr[1][0]);
        } catch (error) {
            console.error('Update semestr error:', error);
            return next(ApiError.internal('Ошибка при обновлении данных семестра'));
        }
    }

    // Удаление семестра
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID семестра'));
            }
            const semestr = await Semestres.findOne({ where: { id_semestr: id } });
            if (!semestr) {
                return next(ApiError.notFound('Семестр не найден'));
            }
            await Semestres.destroy({ where: { id_semestr: id } });
            return res.json({ message: 'Семестр успешно удален' });
        } catch (error) {
            console.error('Delete semestr error:', error);
            return next(ApiError.internal('Ошибка при удалении семестра'));
        }
    }

    // Дополнительный метод: получение текущего семестра
    async getCurrent(req, res, next) {
        try {
            const currentDate = new Date();
            const currentSemestr = await Semestres.findOne({
                where: {
                    start_date: { [Op.lte]: currentDate },
                    end_date: { [Op.gte]: currentDate }
                }
            });
            if (!currentSemestr) {
                return next(ApiError.notFound('Текущий семестр не найден'));
            }
            return res.json(currentSemestr);
        } catch (error) {
            console.error('Get current semestr error:', error);
            return next(ApiError.internal('Ошибка при получении текущего семестра'));
        }
    }
}

module.exports = new SemestrController();