
const pool = require('../db');

// Obtener todos los vehículos
const getAllVehiculos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehiculos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener vehiculos:', err);
    res.status(500).json({ error: 'Error al obtener vehiculos' });
  }
};

// Obtener un vehículo por ID
const getVehiculoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM vehiculos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener vehículo:', err);
    res.status(500).json({ error: 'Error al obtener vehículo' });
  }
};

// Crear un nuevo vehículo
const createVehiculo = async (req, res) => {
  const { marca, modelo, año } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO vehiculos (marca, modelo, año) VALUES ($1, $2, $3) RETURNING *',
      [marca, modelo, año]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear vehículo:', err);
    res.status(500).json({ error: 'Error al crear vehículo' });
  }
};

// Actualizar un vehículo
const updateVehiculo = async (req, res) => {
  const { id } = req.params;
  const { marca, modelo, año } = req.body;
  try {
    const result = await pool.query(
      'UPDATE vehiculos SET marca = $1, modelo = $2, año = $3 WHERE id = $4 RETURNING *',
      [marca, modelo, año, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar vehículo:', err);
    res.status(500).json({ error: 'Error al actualizar vehículo' });
  }
};

// Eliminar un vehículo
const deleteVehiculo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM vehiculos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.json({ message: 'Vehículo eliminado' });
  } catch (err) {
    console.error('Error al eliminar vehículo:', err);
    res.status(500).json({ error: 'Error al eliminar vehículo' });
  }
};

module.exports = {
  getAllVehiculos,
  getVehiculoById,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
};