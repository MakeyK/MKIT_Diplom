const ApiError = require('../ApiError');
const { Curators } = require('../models/models');

class CuratorController {
    async create(req, res, next) {
        try {
            const { first_name, last_name, patronymic, phone_number } = req.body;
            if (!first_name || !last_name) {
                return next(ApiError.badRequest('Необходимо заполнить обязательные поля: имя и фамилия'));
            }
            const curator = await Curators.create({ first_name, last_name, patronymic: patronymic || null, phone_number: phone_number || null });
            return res.json(curator);
        } catch (error) {
            console.error('Create curator error:', error);
            return next(ApiError.internal('Ошибка при создании куратора'));
        }
    }

    // Получение всех кураторов
    async getAll(req, res, next) {
        try {
            const curators = await Curators.findAll({
                order: [['last_name', 'ASC']]
            });
            return res.json(curators);
        } catch (error) {
            console.error('Get all curators error:', error);
            return next(ApiError.internal('Ошибка при получении списка кураторов'));
        }
    }

    // Получение одного куратора по ID
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID куратора'));
            }
            const curator = await Curators.findOne({
                where: { id_curator: id }
            });
            if (!curator) {
                return next(ApiError.notFound('Куратор не найден'));
            }
            return res.json(curator);
        } catch (error) {
            console.error('Get curator error:', error);
            return next(ApiError.internal('Ошибка при получении куратора'));
        }
    }

    // Обновление данных куратора
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { first_name, last_name, patronymic, phone_number } = req.body;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID куратора'));
            }
            const curator = await Curators.findOne({ where: { id_curator: id } });
            if (!curator) {
                return next(ApiError.notFound('Куратор не найден'));
            }
            const updatedCurator = await Curators.update(
                {
                    first_name: first_name || curator.first_name,
                    last_name: last_name || curator.last_name,
                    patronymic: patronymic !== undefined ? patronymic : curator.patronymic,
                    phone_number: phone_number !== undefined ? phone_number : curator.phone_number
                },
                {
                    where: { id_curator: id },
                    returning: true
                }
            );

            return res.json(updatedCurator[1][0]);
        } catch (error) {
            console.error('Update curator error:', error);
            return next(ApiError.internal('Ошибка при обновлении данных куратора'));
        }
    }

    // Удаление куратора
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID куратора'));
            }
            const curator = await Curators.findOne({ where: { id_curator: id } });
            if (!curator) {
                return next(ApiError.notFound('Куратор не найден'));
            }
            await Curators.destroy({ where: { id_curator: id } });
            return res.json({ message: 'Куратор успешно удален' });
        } catch (error) {
            console.error('Delete curator error:', error);
            return next(ApiError.internal('Ошибка при удалении куратора'));
        }
    }
}

module.exports = new CuratorController();