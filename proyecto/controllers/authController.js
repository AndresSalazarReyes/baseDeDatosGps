// controllers/authController.js
const pool = require('../config/db');  // La conexión a la base de datos PostgreSQL
const bcrypt = require('bcrypt');  // Para comparar contraseñas
const jwt = require('jsonwebtoken');  // Para generar el token JWT

// Controlador para el login
exports.login = async (req, res) => {
  const { usuario, contraseña } = req.body;

  router.post('/login', authController.login);

  try {
    // Verificamos si el usuario existe en la base de datos
    const query = 'SELECT * FROM personal WHERE usuario = $1';
    const result = await pool.query(query, [usuario]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];

    // Verificamos si la contraseña es correcta
    const passwordIsValid = await bcrypt.compare(contraseña, user.contraseña_hash);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Si todo está bien, generamos un token JWT
    const token = jwt.sign(
      { id_personal: user.id_personal, rol: user.rol },  // Cargamos el ID y el rol del usuario en el token
      'secret_key',  // La clave secreta para firmar el token (en producción, usar variables de entorno)
      { expiresIn: '24h' }  // El token expirará en 24 horas
    );

    // Devolvemos el token y el rol del usuario
    res.status(200).json({
      message: 'Login exitoso',
      token: token,
      rol: user.rol
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};