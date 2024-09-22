const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');  // Importar rutas de autenticación
const activosRoutes = require('./routes/activosRoutes');  // Importar rutas de servicios activos

// Middleware para analizar JSON
app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);  // Ruta base para autenticación

// Rutas de servicios activos
app.use('/activos', activosRoutes);  // Ruta base para servicios activos

module.exports = app;