// routes/auth.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController'); // Lo crearemos

// POST /api/auth/register - Registra un nuevo usuario
// Usamos express-validator para chequear los campos obligatorios
router.post('/register', [
    check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 })
], authController.registrarUsuario);

// POST /api/auth/login - Autentica el usuario y devuelve el token
router.post('/login', [
    check('email', 'El Email es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()
], authController.autenticarUsuario);

module.exports = router;