const ApiError = require('../ApiError');
const { SupportTickets } = require('../models/models');

class SupportTicketController {
    async create(req, res, next) {
        try {
            const { title, topic, problem_description, priority = '1' } = req.body;
            if (!title || !topic || !problem_description) {
                return next(ApiError.badRequest('Необходимо заполнить обязательные поля: заголовок, тема и описание проблемы'));
            }
            const validPriorities = ['1', '2', '3', '4', '5'];
            if (priority && !validPriorities.includes(priority)) {
                return next(ApiError.badRequest('Приоритет должен быть одним из: 1, 2, 3, 4, 5 (5 - наивысший)'));
            }
            const ticket = await SupportTickets.create({ title, topic, problem_description, priority, status: 'Новое', created_at: new Date() });
            return res.json(ticket);
        } catch (error) {
            console.error('Create ticket error:', error);
            return next(ApiError.badRequest('Ошибка при создании тикета'));
        }
    }

    // Получение всех тикетов
    async getAll(req, res, next) {
        try {
            const tickets = await SupportTickets.findAll({
                order: [
                    ['priority', 'DESC'],
                    ['created_at', 'ASC']
                ]
            });
            return res.json(tickets);
        } catch (error) {
            console.error('Get all tickets error:', error);
            return next(ApiError.internal('Ошибка при получении списка тикетов'));
        }
    }

    // Получение одного тикета по ID
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID тикета'));
            }
            const ticket = await SupportTickets.findOne({
                where: { id_ticket: id }
            });
            if (!ticket) {
                return next(ApiError.notFound('Тикет не найден'));
            }
            return res.json(ticket);
        } catch (error) {
            console.error('Get ticket error:', error);
            return next(ApiError.internal('Ошибка при получении тикета'));
        }
    }

    // Обновление данных тикета
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title, topic, problem_description, status, priority } = req.body;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID тикета'));
            }
            const ticket = await SupportTickets.findOne({ where: { id_ticket: id } });
            if (!ticket) {
                return next(ApiError.notFound('Тикет не найден'));
            }
            const validPriorities = ['1', '2', '3', '4', '5'];
            if (priority && !validPriorities.includes(priority)) {
                return next(ApiError.badRequest('Приоритет должен быть одним из: 1, 2, 3, 4, 5 (5 - наивысший)'));
            }
            const validStatuses = ['Новое', 'В процессе', 'Решенный', 'Закрыта'];
            if (status && !validStatuses.includes(status)) {
                return next(ApiError.badRequest(`Недопустимый статус. Допустимые значения: ${validStatuses.join(', ')}`));
            }
            const updatedTicket = await SupportTickets.update(
                {
                    title: title || ticket.title,
                    topic: topic || ticket.topic,
                    problem_description: problem_description || ticket.problem_description,
                    status: status || ticket.status,
                    priority: priority || ticket.priority
                },
                {
                    where: { id_ticket: id },
                    returning: true
                }
            );
            return res.json(updatedTicket[1][0]);
        } catch (error) {
            console.error('Update ticket error:', error);
            return next(ApiError.internal('Ошибка при обновлении данных тикета'));
        }
    }

    // Удаление тикета
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID тикета'));
            }
            const ticket = await SupportTickets.findOne({ where: { id_ticket: id } });
            if (!ticket) {
                return next(ApiError.notFound('Тикет не найден'));
            }
            await SupportTickets.destroy({ where: { id_ticket: id } });
            return res.json({ message: 'Тикет успешно удален' });
        } catch (error) {
            console.error('Delete ticket error:', error);
            return next(ApiError.internal('Ошибка при удалении тикета'));
        }
    }

    // Дополнительный метод: получение тикетов по статусу
    async getByStatus(req, res, next) {
        try {
            const { status } = req.params;
            const validStatuses = ['open', 'in_progress', 'resolved', 'closed'];
            if (!validStatuses.includes(status)) {
                return next(ApiError.badRequest(`Недопустимый статус. Допустимые значения: ${validStatuses.join(', ')}`));
            }
            const tickets = await SupportTickets.findAll({
                where: { status },
                order: [
                    ['priority', 'DESC'],
                    ['created_at', 'ASC']
                ]
            });
            return res.json(tickets);
        } catch (error) {
            console.error('Get tickets by status error:', error);
            return next(ApiError.internal('Ошибка при получении тикетов по статусу'));
        }
    }
}

module.exports = new SupportTicketController();