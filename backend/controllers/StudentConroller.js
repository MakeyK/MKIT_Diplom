const ApiError = require('../ApiError');
const { Students, Groups } = require('../models/models');

class StudentController {
    async create(req, res, next) {
        try {
            const { id_group, first_name, last_name, patronymic, date_of_birthday, admission_year, student_card_number, phone_number } = req.body;
            if (!id_group || !first_name || !last_name || !admission_year || !student_card_number) {
                return next(ApiError.badRequest('Необходимо заполнить обязательные поля: ID группы, имя, фамилия, год поступления и номер студенческого билета'));
            }
            const group = await Groups.findOne({ where: { id_group } });
            if (!group) {
                return next(ApiError.badRequest('Указанная группа не существует'));
            }
            const student = await Students.create({
                id_group, first_name, last_name, patronymic: patronymic || null, date_of_birthday: date_of_birthday || null, admission_year, student_card_number, phone_number: phone_number || null
            });
            return res.json(student);
        } catch (error) {
            console.error('Create student error:', error);
            return next(ApiError.internal('Ошибка при создании студента'));
        }
    }

    async getAll(req, res, next) {
        try {
            const students = await Students.findAll({
                include: [{ model: Groups, as: 'group' }],
                order: [['last_name', 'ASC']]
            });
            return res.json(students);
        } catch (error) {
            console.error('Get all students error:', error);
            return next(ApiError.internal('Ошибка при получении списка студентов'));
        }
    }

    // Получение одного студента по ID
    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID студента'));
            }
            const student = await Students.findOne({
                where: { id_student: id },
                include: [{ model: Groups, as: 'group' }]
            });
            if (!student) {
                return next(ApiError.notFound('Студент не найден'));
            }
            return res.json(student);
        } catch (error) {
            console.error('Get student error:', error);
            return next(ApiError.internal('Ошибка при получении студента'));
        }
    }

    // Обновление данных студента
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { id_group, first_name, last_name, patronymic, date_of_birthday, admission_year, student_card_number, phone_number } = req.body;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID студента'));
            }
            const student = await Students.findOne({ where: { id_student: id } });
            if (!student) {
                return next(ApiError.notFound('Студент не найден'));
            }
            if (id_group && id_group !== student.id_group) {
                const group = await Groups.findOne({ where: { id_group } });
                if (!group) {
                    return next(ApiError.badRequest('Указанная группа не существует'));
                }
            }
            const updatedStudent = await Students.update(
                {
                    id_group: id_group || student.id_group,
                    first_name: first_name || student.first_name,
                    last_name: last_name || student.last_name,
                    patronymic: patronymic !== undefined ? patronymic : student.patronymic,
                    date_of_birthday: date_of_birthday || student.date_of_birthday,
                    admission_year: admission_year || student.admission_year,
                    student_card_number: student_card_number || student.student_card_number,
                    phone_number: phone_number !== undefined ? phone_number : student.phone_number
                },
                {
                    where: { id_student: id },
                    returning: true
                }
            );
            return res.json(updatedStudent[1][0]);
        } catch (error) {
            console.error('Update student error:', error);
            return next(ApiError.internal('Ошибка при обновлении данных студента'));
        }
    }

    // Удаление студента
    async delete(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('Не указан ID студента'));
            }
            const student = await Students.findOne({ where: { id_student: id } });
            if (!student) {
                return next(ApiError.notFound('Студент не найден'));
            }
            await Students.destroy({ where: { id_student: id } });
            return res.json({ message: 'Студент успешно удален' });
        } catch (error) {
            console.error('Delete student error:', error);
            return next(ApiError.internal('Ошибка при удалении студента'));
        }
    }

    // Получение студентов по группе (дополнительный метод)
    async getByGroup(req, res, next) {
        try {
            const { groupId } = req.params;
            if (!groupId) {
                return next(ApiError.badRequest('Не указан ID группы'));
            }
            const students = await Students.findAll({
                where: { id_group: groupId },
                order: [['last_name', 'ASC']]
            });
            return res.json(students);
        } catch (error) {
            console.error('Get students by group error:', error);
            return next(ApiError.internal('Ошибка при получении студентов группы'));
        }
    }
}

module.exports = new StudentController();