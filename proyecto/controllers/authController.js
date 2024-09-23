const express = require('express');  // Importar express
const pool = require('../config/db');  // La conexión a la base de datos PostgreSQL
const bcrypt = require('bcrypt');  // Para comparar contraseñas
const jwt = require('jsonwebtoken');  // Para generar el token JWT

/// Controlador para el login
exports.login = async (req, res) => {
  const { usuario, contraseña } = req.body;

  try {
    const query = 'SELECT * FROM personal WHERE usuario = $1';
    const result = await pool.query(query, [usuario]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = result.rows[0];
    const passwordIsValid = await bcrypt.compare(contraseña, user.contraseña_hash);

    if (!passwordIsValid) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id_personal: user.id_personal, rol: user.rol },
      'secret_key',
      { expiresIn: '24h' }
    );

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