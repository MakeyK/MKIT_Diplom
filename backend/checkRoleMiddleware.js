const jwt = require('jsonwebtoken');
const { Response, NextFunction } = require('express');

const secret_key = process.env.SECRET_KEY;

const ROLES = {
  ADMIN: 'adminrole',
  KURATOR: 'kurator111',
  TEACHER: 'prepod590',
  STUDENT: 'mkit'
};

module.exports = function (allowedRoles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            return next();
        }

        if (!Array.isArray(allowedRoles)) {
            allowedRoles = [allowedRoles];
        }

        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Для просмотра данной страницы необходимо авторизоваться' });
        }

        try {
            const decoded = jwt.verify(token, secret_key);
            console.log('Decoded token:', decoded);
            const userRole = decoded.role;
            if (userRole !== ROLES.ADMIN && !allowedRoles.includes(userRole)) {
                console.log('Required roles:', allowedRoles);
                console.log('User role:', userRole);
                return res.status(403).json({ message: 'Нет доступа для просмотра данной страницы' });
            }
            
            req.user = decoded; 
            next();
        } catch (error) {
            console.error('JWT verification error:', error);
            return res.status(401).json({ message: 'Ошибка авторизации' });
        }
    }
}

module.exports.ROLES = ROLES;