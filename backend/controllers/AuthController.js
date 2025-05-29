const ApiError = require('../ApiError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../models/models');

const ROLE_KEYS = {
  admin: 'adminrole',
  student: 'mkit',
  curator: 'kurator111',
  instructor: 'prepod590'
};

const generateJwt = (id_user, login, role) => {
  return jwt.sign(
    { id_user, login, role },
    process.env.SECRET_KEY,
    { expiresIn: '72h' }
  );
};

class AuthController {
  async registration(req, res, next) {
    try {
        const { login, password, email, secretKey } = req.body;

        if (!login || !password || !email || !secretKey) {
            return next(ApiError.badRequest('Все поля обязательны для заполнения'));
        }

        const validKeys = Object.values(ROLE_KEYS);
        if (!validKeys.includes(secretKey)) {
            return next(ApiError.badRequest('Неверный секретный ключ'));
        }

        const candidate = await Users.findOne({ where: { login } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким логином уже существует'));
        }

        let role = 'user';
        for (const [roleName, key] of Object.entries(ROLE_KEYS)) {
            if (secretKey === key) {
                role = roleName;
                break;
            }
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({ login, password: hashPassword,email, role });

        const token = generateJwt(user.id_user, user.login, user.role);
        return res.json({ token });
    } catch (error) {
        console.error('Registration error:', error);
        return next(ApiError.internal('Ошибка при регистрации'));
    }
}

  async login(req, res, next) {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return next(ApiError.badRequest('Логин и пароль обязательны для заполнения'));
        }

        const user = await Users.findOne({ where: { login } });

        if (!user) {
            return next(ApiError.notFound('Пользователь не найден'));
        }

        console.log('Input password:', password);
        console.log('Stored password hash:', user.password);

        const isBcryptHash = user.password.startsWith('$2b$') || user.password.startsWith('$2a$') || user.password.startsWith('$2y$');
        
        if (!isBcryptHash) {
            console.error('Stored password is not a bcrypt hash');
            return next(ApiError.badRequest('Ошибка аутентификации'));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(ApiError.forbidden('Неверный пароль'));
        }

        const token = generateJwt(user.id_user, user.login, user.role);
        return res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        return next(ApiError.badRequest('Ошибка при входе в систему'));
    }
}
}

module.exports = new AuthController();