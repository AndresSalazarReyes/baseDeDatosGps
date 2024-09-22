const express = require('express');
const router = express.Router();
const activosController = require('../controllers/activosController');
const { verifyToken, isAdmin, isEmpleado } = require('../middlewares/authMiddleware');

// Rutas para los servicios activos
router.get('/', verifyToken, isEmpleado, activosController.getAllActivos); // Empleado puede ver
router.get('/:id', verifyToken, isEmpleado, activosController.getActivoById); // Empleado puede ver
router.post('/', verifyToken, isAdmin, activosController.createActivo); // Solo admin puede crear
router.put('/:id', verifyToken, isAdmin, activosController.updateActivo); // Solo admin puede actualizar
router.put('/:id/suspender', verifyToken, isAdmin, activosController.suspendActivo); // Solo admin puede suspender
router.delete('/:id', verifyToken, isAdmin, activosController.deleteActivo); // Solo admin puede eliminar

module.exports = router;