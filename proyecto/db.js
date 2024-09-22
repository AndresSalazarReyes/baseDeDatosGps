// db.js
const { Pool } = require('pg');

// Configuración de la conexión
const pool = new Pool({
  user: 'postgres',       // Usuario de PostgreSQL
  host: 'localhost',        // Host de tu base de datos
  database: 'postgres',  // Nombre de tu base de datos
  password: '123', // Contraseña del usuario de PostgreSQL
  port: 5432, 
  searchPath: ['public'],            
});

module.exports = pool;