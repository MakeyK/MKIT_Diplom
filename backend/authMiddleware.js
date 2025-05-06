// const jwt = require('jsonwebtoken')

// module.exports = function (req, res, next) {
//     if (req.method === "OPTIONS") {
//         next()
//     }
//     try {
//         const token = req.headers.authorization.split(' ')[1]
//         if (!token) {
//             return res.status(401).json({ message: "Не авторизован" })
//         }
//         const decoded = jwt.verify(token, process.env.SECRET_KEY)
//         req.user = decoded
//         next()
//     } catch (e) {   
//         res.status(401).json({ message: "Ошибка" })
//     }
// };

const jwt = require('jsonwebtoken');

module.exports = function authMiddleware(req, res, next) {
    // Пропускаем OPTIONS-запросы (для CORS)
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        // Проверяем наличие заголовка Authorization
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: "Authorization header is missing"
            });
        }
        const [bearer, token] = req.headers.authorization.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({
                success: false,
                message: "Invalid authorization header format. Expected: Bearer <token>"
            });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded.id_user || !decoded.login || !decoded.role) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload"
            });
        }

        // Добавляем информацию о пользователе в запрос
        req.user = { id: decoded.id_user, login: decoded.login, role: decoded.role };
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);

        // Разные сообщения об ошибках для разных случаев
        let errorMessage = "Authentication failed";
        if (error instanceof jwt.TokenExpiredError) {
            errorMessage = "Token expired";
        } else if (error instanceof jwt.JsonWebTokenError) {
            errorMessage = "Invalid token";
        }
        return res.status(401).json({
            success: false,
            message: errorMessage,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};