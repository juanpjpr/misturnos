// models/Turno.js
const mongoose = require('mongoose');

const TurnoSchema = mongoose.Schema({
    fechaHora: {
        type: Date,
        required: true,
        // CLAVE: asegura que solo puede haber un turno a esa hora exacta
        unique: true 
    },
    servicio: {
        type: String,
        required: true,
        trim: true
    },
    cliente: {
        type: String, 
        required: true,
        trim: true
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Confirmado', 'Cancelado', 'Completado'],
        default: 'Pendiente'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Turno', TurnoSchema);