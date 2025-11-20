// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({ msg: 'Permiso denegado, no hay token' });
    }

    // Validar el token
    try {
        const cifrado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = cifrado.usuario; // Extrae el payload (id y rol) y lo inyecta en el request
        next(); // Continúa al siguiente middleware o controlador
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' });
    }
}