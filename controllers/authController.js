// controllers/authController.js
const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Función auxiliar para crear y firmar el JWT
const crearToken = (usuario) => {
    // 1. Payload: Información que se guarda en el token
    const payload = {
        usuario: {
            id: usuario.id,
            rol: usuario.rol
        }
    };

    // 2. Firma el token
    return jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: '7d' // El token expira en 7 días
        }
    );
};

// POST /api/auth/register
exports.registrarUsuario = async (req, res) => {
    // Revisa si hay errores de express-validator
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { email, password } = req.body;

    try {
        // 1. Verificar que el email no esté ya registrado
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // 2. Crear nuevo usuario
        usuario = new Usuario(req.body);

        // 3. Encriptar la contraseña
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        // 4. Guardar en la DB
        await usuario.save();

        // 5. Crear y devolver el token
        const token = crearToken(usuario);
        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor al registrar');
    }
};

// POST /api/auth/login
exports.autenticarUsuario = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { email, password } = req.body;

    try {
        // 1. Revisar si el usuario existe
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // 2. Revisar la contraseña (compara la hash con el password enviado)
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if (!passCorrecto) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // 3. Si todo es correcto, crear y devolver el token
        const token = crearToken(usuario);
        res.json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor al autenticar');
    }
};