// server.js
const express = require('express');
const connectDB = require('./config/db'); 
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 4000;

// Conectar a la base de datos
connectDB();

// Middleware: permite a Express parsear JSON de las peticiones
app.use(express.json({ extended: true }));

// Definir Rutas
// Conectamos la ruta /api/turnos a nuestro archivo de rutas de turnos
app.use('/api/turnos', require('./routes/turnos')); 

app.use('/api/auth', require('./routes/auth')); // <-- NUEVA LÍNEA
// Ruta principal simple
app.get('/', (req, res) => {
    res.send('Servidor de Turnos MVP corriendo');
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));