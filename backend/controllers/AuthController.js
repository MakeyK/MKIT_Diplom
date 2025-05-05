const ApiError = require('../ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Users, UserStorage } = require('../models/models')
const sequelize = require('../db');

const generateJwt = (id_user, login, role) => {
  return jwt.sign
    (
      { id_user, login, role },
      process.env.SECRET_KEY,
      { expiresIn: '72h' }
    )
}

class AuthController {
  async registration(req, res, next) {
    try {
      const { login, password, secretKey } = req.body;
      let candidate = await Users.findOne({ where: { login } });
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким login уже существует'));
      }
      let role = 'user';
      if (secretKey === 'MakeyK') {
        role = 'admin';
      }
      const user = await Users.create({ login, password, role });
      const token = generateJwt(user.id_user, user.login, user.role);
      return res.json({ token });
    } catch (error) {
      console.log(error);
      return next(ApiError.badRequest("Сервер чуть не сгорел"));
    }
  }


  async login(req, res, next) {
    try {
      const { login, password } = req.body
      const user = await Users.findOne({ where: { login } })
      if (!user) {
        return next(ApiError.interval('Пользователь не найден'))
      }
      const token = generateJwt(user.id_user, user.login, user.role)
      res.json({ token: token })
    } catch (error) {
      console.log(error)
      return next(ApiError.badRequest("Сервер чуть не сгорел"))
    }
  }


}


module.exports = new AuthController()   