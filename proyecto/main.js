const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');  // Asegúrate de la ruta correcta

app.use(express.json());  // Para poder parsear JSON
app.use('/auth', authRoutes);  // Usar el enrutador

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');
});