// routes/turnos.js
const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/turnoController');
const auth = require('../middleware/auth'); // <-- Importar el middleware

// Ruta 1: POST /api/turnos -> Crear Turno (PROTEGIDA)
router.post('/', auth, turnoController.crearTurno); // <-- Aplica 'auth'

// Ruta 2: GET /api/turnos -> Obtener Todos (PÚBLICA - para que el frontend vea la agenda)
router.get('/', turnoController.obtenerTurnos);

// Ruta 3: DELETE /api/turnos/:id -> Eliminar por ID (PROTEGIDA)
router.delete('/:id', auth, turnoController.eliminarTurno); // <-- Aplica 'auth'

// Ruta 4: PUT /api/turnos/:id -> Actualizar por ID (PROTEGIDA)
router.put('/:id', auth, turnoController.actualizarTurno); // <-- Aplica 'auth'

module.exports = router;