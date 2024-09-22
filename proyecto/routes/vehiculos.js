const express = require('express');
const router = express.Router();
const vehiculosController = require('../controllers/vehiculos');


// Definir las rutas
router.get('/', vehiculosController.getAllVehiculos);
router.get('/:id', vehiculosController.getVehiculoById);
router.post('/', vehiculosController.createVehiculo);
router.put('/:id', vehiculosController.updateVehiculo);
router.delete('/:id', vehiculosController.deleteVehiculo);

module.exports = router;    