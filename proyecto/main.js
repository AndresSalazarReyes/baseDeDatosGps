const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes'); 
const activosRoutes = require('./routes/activosRoutes'); // Asegúrate de la ruta correcta

app.use(express.json());  // Para poder parsear JSON
app.use('/auth', authRoutes);

app.use('/auth/activos', activosRoutes);
app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});