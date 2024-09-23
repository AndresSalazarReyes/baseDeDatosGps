const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');  // Importación correcta

router.post('/login', authController.login);  // Esto debe ser correcto

module.exports = router;  // Exporta el route