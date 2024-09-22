const pool = require('../db');

// Obtener todos los activos
const getAllActivos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM activos');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener activos:', err);
    res.status(500).json({ error: 'Error al obtener activos' });
  }
};

// Obtener un activo por ID
const getActivoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM activos WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Activo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener activo:', err);
    res.status(500).json({ error: 'Error al obtener activo' });
  }
};

// Crear un nuevo activo
const createActivo = async (req, res) => {
  const { descripcion, valor, estado } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO activos (descripcion, valor, estado) VALUES ($1, $2, $3) RETURNING *',
      [descripcion, valor, estado]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al crear activo:', err);
    res.status(500).json({ error: 'Error al crear activo' });
  }
};

// Actualizar un activo
const updateActivo = async (req, res) => {
  const { id } = req.params;
  const { descripcion, valor, estado } = req.body;
  try {
    const result = await pool.query(
      'UPDATE activos SET descripcion = $1, valor = $2, estado = $3 WHERE id = $4 RETURNING *',
      [descripcion, valor, estado, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Activo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar activo:', err);
    res.status(500).json({ error: 'Error al actualizar activo' });
  }
};

// Eliminar un activo
const deleteActivo = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM activos WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Activo no encontrado' });
    }
    res.json({ message: 'Activo eliminado' });
  } catch (err) {
    console.error('Error al eliminar activo:', err);
    res.status(500).json({ error: 'Error al eliminar activo' });
  }
};

module.exports = {
  getAllActivos,
  getActivoById,
  createActivo,
  updateActivo,
  deleteActivo,
};