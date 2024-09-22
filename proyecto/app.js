
const express = require('express');
const app = express();


const middleware = require('./middleware');
app.use(middleware); // Correct

// Importar rutas
const vehiculosRoutes = require('./routes/vehiculos');
const activosRoutes = require('./routes/activos');
const gpsRoutes = require('./routes/gps');
const instalacionesRoutes = require('./routes/instalaciones');
const pagosRoutes = require('./routes/pagos');
const personalRoutes = require('./routes/personal');
const revisionRoutes = require('./routes/revision');
const suspendidosRoutes = require('./routes/suspendidos');

// Middleware
app.use(express.json());

// Usar rutas
app.use('/vehiculos', vehiculosRoutes);
app.use('/activos', activosRoutes);
app.use('/gps', gpsRoutes);
app.use('/instalaciones', instalacionesRoutes);
app.use('/pagos', pagosRoutes);
app.use('/personal', personalRoutes);
app.use('/revision', revisionRoutes);
app.use('/suspendidos', suspendidosRoutes);

module.exports = app;

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});