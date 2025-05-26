const ApiError = require('../ApiError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Добавлен импорт bcrypt
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
        return next(ApiError.badRequest('Все поля (логин, пароль, почта и секретный ключ) обязательны для заполнения'));
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
      const user = await Users.create({ login, password, email, role });
      const token = generateJwt(user.id_user, user.login, user.email, user.role);

      return res.json({ token });
    } catch (error) {
      console.error('Registration error:', error);
      return next(ApiError.internalServerError('Ошибка при регистрации')); // Изменено на internalServerError
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

      // Используем bcrypt для проверки пароля
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return next(ApiError.unauthorized('Неверный пароль'));
      }

      const token = generateJwt(user.id_user, user.login, user.role);
      return res.json({ token });
    } catch (error) {
      console.error('Login error:', error);
      return next(ApiError.internalServerError('Ошибка при входе в систему')); // Изменено на internalServerError
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id_user, req.user.login, req.user.role);
      return res.json({ token });
    } catch (error) {
      console.error('Check auth error:', error);
      return next(ApiError.internalServerError('Ошибка проверки авторизации')); // Изменено на internalServerError
    }
  }
}

module.exports = new AuthController();