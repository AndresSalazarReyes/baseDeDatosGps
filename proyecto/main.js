const express = require('express');
const dotenv = require('dotenv');
dotenv.config(); // Cargar variables de entorno desde el archivo .env

const app = express();
const authRoutes = require('./routes/authRoutes'); 
const activosRoutes = require('./routes/activosRoutes'); 

app.use(express.json());  

app.use('/auth', authRoutes);
app.use('/activos', activosRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto 3000');

    if (!process.env.JWT_SECRET) {
        console.error('Error: JWT_SECRET no está definido. Verifica tu archivo .env y reinicia el servidor.');
      } else {
        console.log('JWT_SECRET cargado correctamente');
      }
});