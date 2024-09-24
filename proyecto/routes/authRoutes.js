const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Rutas de autenticación
router.post('/login', authController.login);

// Rutas protegidas (ejemplo para admins)
router.get('/admin', verifyToken, isAdmin, (req, res) => {
  res.status(200).json({ message: 'Ruta protegida para admins' });
});

module.exports = router;