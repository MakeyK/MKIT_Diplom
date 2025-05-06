const { type } = require('os');
const sequelize = require('../db');
const { DataTypes, UUIDV4 } = require('sequelize');

const Users = sequelize.define('users', {
    id_user: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    login: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING }
}, { timestamps: false });

const Courses = sequelize.define('courses', {
    id_course: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    cours_name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    duration_years: { type: DataTypes.INTEGER }
}, { timestamps: false });

const Groups = sequelize.define('groups', {
    id_group: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    name_group: { type: DataTypes.STRING },
    specialization: { type: DataTypes.STRING },
    course_number: { type: DataTypes.INTEGER },
    created_year: { type: DataTypes.INTEGER }
}, { timestamps: false });

const Students = sequelize.define('students', {
    id_student: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    id_group: { type: DataTypes.UUID, references: { model: Groups, key: 'id_group' } },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    patronymic: { type: DataTypes.STRING },
    date_of_birthday: { type: DataTypes.DATE },
    admission_year: { type: DataTypes.INTEGER },
    student_card_number: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING }
}, { timestamps: false });

const SupportTickets = sequelize.define('support_tickets', {
    id_ticket: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    title: { type: DataTypes.STRING },
    topic: { type: DataTypes.STRING },
    problem_description: { type: DataTypes.TEXT },
    status: { type: DataTypes.STRING },
    priority: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE }
}, { timestamps: false });

const GroupCourse = sequelize.define('group_course', {
    id_group: { type: DataTypes.UUID, references: { model: Groups, key: 'id_group' } },
    id_course: { type: DataTypes.UUID, references: { model: Courses, key: 'id_course' } }
}, { timestamps: false });

const Curators = sequelize.define('curators', {
    id_curator: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    patronymic: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING }
}, { timestamps: false });

const Instructors = sequelize.define('instructors', {
    id_instructor: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    patronymic: { type: DataTypes.STRING },
    departament: { type: DataTypes.STRING },
    phone_number: { type: DataTypes.STRING }
}, { timestamps: false });

const Subjects = sequelize.define('subjects', {
    id_subject: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    subject_name: { type: DataTypes.STRING },
    hours_total: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT }
}, { timestamps: false });

const Semestres = sequelize.define('semestres', {
    id_semestr: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    semestr_name: { type: DataTypes.STRING },
    start_date: { type: DataTypes.DATE },
    end_date: { type: DataTypes.DATE }
}, { timestamps: false });

const Grades = sequelize.define('grades', {
    id_grade: { type: DataTypes.UUID, primaryKey: true, defaultValue: UUIDV4 },
    grade_value: { type: DataTypes.INTEGER },
    grade_type: { type: DataTypes.STRING },
    comments: { type: DataTypes.TEXT }
}, { timestamps: false });

const InstructorSubject = sequelize.define('instructor_subject', {
    id_instructor: { type: DataTypes.UUID, references: { model: Instructors, key: 'id_instructor' } },
    id_subject: { type: DataTypes.UUID, references: { model: Subjects, key: 'id_subject' } }
}, { timestamps: false });

// Определение связей
Users.hasOne(Students, { foreignKey: 'id_user' });
Students.belongsTo(Users, { foreignKey: 'id_user' });

Users.hasOne(Curators, { foreignKey: 'id_user' });
Curators.belongsTo(Users, { foreignKey: 'id_user' });

Users.hasOne(Instructors, { foreignKey: 'id_user' });
Instructors.belongsTo(Users, { foreignKey: 'id_user' });

Users.hasMany(SupportTickets, { foreignKey: 'id_user' });
SupportTickets.belongsTo(Users, { foreignKey: 'id_user' });

Groups.hasMany(Students, { foreignKey: 'id_group' });
Students.belongsTo(Groups, { foreignKey: 'id_group' });

Groups.belongsTo(Curators, { foreignKey: 'id_curator' });
Curators.hasMany(Groups, { foreignKey: 'id_curator' });

Groups.belongsToMany(Courses, { through: GroupCourse, foreignKey: 'id_group' });
Courses.belongsToMany(Groups, { through: GroupCourse, foreignKey: 'id_course' });

Instructors.belongsToMany(Subjects, { through: InstructorSubject, foreignKey: 'id_instructor' });
Subjects.belongsToMany(Instructors, { through: InstructorSubject, foreignKey: 'id_subject' });

Grades.belongsTo(Students, { foreignKey: 'id_student' });
Students.hasMany(Grades, { foreignKey: 'id_student' });

Grades.belongsTo(Instructors, { foreignKey: 'id_instructor' });
Instructors.hasMany(Grades, { foreignKey: 'id_instructor' });

Grades.belongsTo(Subjects, { foreignKey: 'id_subject' });
Subjects.hasMany(Grades, { foreignKey: 'id_subject' });

Grades.belongsTo(Semestres, { foreignKey: 'id_semestr' });
Semestres.hasMany(Grades, { foreignKey: 'id_semestr' });

module.exports = {
    Users,
    Courses,
    Groups,
    Students,
    SupportTickets,
    GroupCourse,
    Curators,
    Instructors,
    Subjects,
    Semestres,
    Grades,
    InstructorSubject
};