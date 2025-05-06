const ApiError = require('../ApiError');
const { Grades } = require('../models/models');

class GradeController {
    async create(req, res, next) {
        try {
            const { grade_value, grade_type, comments } = req.body;
            if (!grade_value || !grade_type) {
                return next(ApiError.badRequest('Необходимо заполнить обязательные поля: значение оценки и тип оценки'));
            }
            if (grade_value < 1 || grade_value > 5) {
                return next(ApiError.badRequest('Оценка должна быть в диапазоне от 1 до 5'));
            }
            const validGradeTypes = ['exam', 'test', 'homework', 'quiz', 'participation'];
            if (!validGradeTypes.includes(grade_type)) {
                return next(ApiError.badRequest(`Недопустимый тип оценки. Допустимые значения: ${validGradeTypes.join(', ')}`));
            }
            const grade = await Grades.create({ grade_value, grade_type, comments: comments || null });
            return res.json(grade);
        } catch (error) {
            console.error('Create grade error:', error);
            return next(ApiError.internal('Ошибка при создании оценки'));
        }
    }

    // Получение всех оценок
    async getAll(req, res, next) {
        try {
            const grades = await Grades.findAll({
                order: [['grade_value', 'DESC']]
            });
            return res.json(grades);
        } catch (error) {
            console.error('Get all grades error:', error);
            return next(ApiError.internal('Ошибка при получении списка оценок'));
        }
    }

    // Получение одной оценки по ID
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID оценки'));
            }
            const grade = await Grades.findOne({
                where: { id_grade: id }
            });

            if (!grade) {
                return next(ApiError.notFound('Оценка не найдена'));
            }
            return res.json(grade);
        } catch (error) {
            console.error('Get grade error:', error);
            return next(ApiError.internal('Ошибка при получении оценки'));
        }
    }

    // Обновление данных оценки
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { grade_value, grade_type, comments } = req.body;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID оценки'));
            }
            const grade = await Grades.findOne({ where: { id_grade: id } });
            if (!grade) {
                return next(ApiError.notFound('Оценка не найдена'));
            }
            if (grade_value && (grade_value < 1 || grade_value > 5)) {
                return next(ApiError.badRequest('Оценка должна быть в диапазоне от 1 до 5'));
            }
            const validGradeTypes = ['exam', 'test', 'homework', 'quiz', 'participation'];
            if (grade_type && !validGradeTypes.includes(grade_type)) {
                return next(ApiError.badRequest(`Недопустимый тип оценки. Допустимые значения: ${validGradeTypes.join(', ')}`));
            }
            const updatedGrade = await Grades.update(
                {
                    grade_value: grade_value || grade.grade_value,
                    grade_type: grade_type || grade.grade_type,
                    comments: comments !== undefined ? comments : grade.comments
                },
                {
                    where: { id_grade: id },
                    returning: true
                }
            );
            return res.json(updatedGrade[1][0]);
        } catch (error) {
            console.error('Update grade error:', error);
            return next(ApiError.internal('Ошибка при обновлении данных оценки'));
        }
    }

    // Удаление оценки
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID оценки'));
            }
            const grade = await Grades.findOne({ where: { id_grade: id } });
            if (!grade) {
                return next(ApiError.notFound('Оценка не найдена'));
            }
            await Grades.destroy({ where: { id_grade: id } });
            return res.json({ message: 'Оценка успешно удалена' });
        } catch (error) {
            console.error('Delete grade error:', error);
            return next(ApiError.internal('Ошибка при удалении оценки'));
        }
    }

    // Дополнительный метод: получение оценок по типу
    async getByType(req, res, next) {
        try {
            const { type } = req.params;
            const validGradeTypes = ['exam', 'test', 'homework', 'quiz', 'participation'];
            if (!validGradeTypes.includes(type)) {
                return next(ApiError.badRequest(`Недопустимый тип оценки. Допустимые значения: ${validGradeTypes.join(', ')}`));
            }
            const grades = await Grades.findAll({
                where: { grade_type: type },
                order: [['grade_value', 'DESC']]
            });
            return res.json(grades);
        } catch (error) {
            console.error('Get grades by type error:', error);
            return next(ApiError.internal('Ошибка при получении оценок по типу'));
        }
    }
}

module.exports = new GradeController();