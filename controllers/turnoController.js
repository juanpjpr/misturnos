const Turno = require('../models/Turno');

// @route   POST /api/turnos
// @desc    Crear un nuevo turno (incluye validación de disponibilidad)
exports.crearTurno = async (req, res) => {
    try {
        const { fechaHora, servicio, cliente } = req.body;

        const fechaTurno = new Date(fechaHora);
        // Busca si ya hay un turno con esa hora
        const turnoExistente = await Turno.findOne({ fechaHora: fechaTurno });
        
        if (turnoExistente) {
            return res.status(409).json({ msg: 'Esa fecha y hora ya están reservadas.' });
        }

        const nuevoTurno = new Turno({ fechaHora: fechaTurno, servicio, cliente });
        await nuevoTurno.save();

        res.json(nuevoTurno); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor al crear el turno');
    }
};

// @route   GET /api/turnos
// @desc    Obtener todos los turnos
// controllers/turnoController.js

exports.obtenerTurnos = async (req, res) => {
    try {
        let filtro = {};

        // 1. Si el usuario envía la fecha por query string (ej: ?fecha=2025-12-25)
        if (req.query.fecha) {
            const fechaDeseada = new Date(req.query.fecha);
            
            // Definir el rango de 24 horas para la fecha (inicio del día y final del día)
            const inicioDelDia = new Date(fechaDeseada);
            inicioDelDia.setHours(0, 0, 0, 0);

            const finDelDia = new Date(fechaDeseada);
            finDelDia.setHours(23, 59, 59, 999);

            // Filtro de Mongoose para el rango de fechas
            filtro.fechaHora = {
                $gte: inicioDelDia, // Mayor o igual que (>=) inicio del día
                $lte: finDelDia     // Menor o igual que (<=) fin del día
            };
        }
        
        // 2. Ejecutar la búsqueda con el filtro (o sin él, si no se proporcionó fecha)
        const turnos = await Turno.find(filtro).sort({ fechaHora: 1 }); 
        res.json(turnos);
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor al obtener los turnos');
    }
};

// @route   DELETE /api/turnos/:id
// @desc    Eliminar un turno por ID
exports.eliminarTurno = async (req, res) => {
    try {
        let turno = await Turno.findById(req.params.id);

        if (!turno) {
            return res.status(404).json({ msg: 'Turno no encontrado' });
        }

        await Turno.deleteOne({ _id: req.params.id }); 

        res.json({ msg: 'Turno eliminado correctamente' });
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID de turno no válido' });
        }
        res.status(500).send('Error en el servidor al eliminar el turno');
    }
};

exports.actualizarTurno = async (req, res) => {
    try {
        const { id } = req.params;
        const nuevoTurnoData = req.body; // Esto puede contener 'estado', 'servicio', etc.

        // Validar si el ID es válido
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ msg: 'ID de turno no válido' });
        }

        let turno = await Turno.findById(id);

        if (!turno) {
            return res.status(404).json({ msg: 'Turno no encontrado' });
        }

        // Actualizar el documento en la base de datos
        // { new: true } asegura que devuelve el documento actualizado, no el original
        turno = await Turno.findByIdAndUpdate(
            id,
            { $set: nuevoTurnoData },
            { new: true } 
        );

        res.json(turno);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor al actualizar el turno');
    }
};