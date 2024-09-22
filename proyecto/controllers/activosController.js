const pool = require('../config/db');

// Crear un nuevo servicio activo
exports.createActivo = async (req, res) => {
  const {
    nombre_cliente, cc_nit, celular, email, direccion, placa, imei_gps, fecha_instalacion,
    pago_inicial, valor_mensualidad, valor_total, proximo_pago
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO activos (nombre_cliente, cc_nit, celular, email, direccion, placa, imei_gps, fecha_instalacion,
        pago_inicial, valor_mensualidad, valor_total, proximo_pago)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [nombre_cliente, cc_nit, celular, email, direccion, placa, imei_gps, fecha_instalacion,
        pago_inicial, valor_mensualidad, valor_total, proximo_pago]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el servicio activo' });
  }
};

// Obtener todos los servicios activos
exports.getAllActivos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM activos');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los servicios activos' });
  }
};

// Obtener un servicio activo por su ID
exports.getActivoById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM activos WHERE id_servicio = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Servicio activo no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el servicio activo' });
  }
};

// Actualizar un servicio activo por su ID
exports.updateActivo = async (req, res) => {
  const { id } = req.params;
  const {
    nombre_cliente, cc_nit, celular, email, direccion, placa, imei_gps, fecha_instalacion,
    pago_inicial, valor_mensualidad, valor_total, proximo_pago
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE activos SET 
        nombre_cliente = $1, cc_nit = $2, celular = $3, email = $4, direccion = $5, placa = $6, imei_gps = $7, 
        fecha_instalacion = $8, pago_inicial = $9, valor_mensualidad = $10, valor_total = $11, proximo_pago = $12 
       WHERE id_servicio = $13 RETURNING *`,
      [nombre_cliente, cc_nit, celular, email, direccion, placa, imei_gps, fecha_instalacion,
        pago_inicial, valor_mensualidad, valor_total, proximo_pago, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Servicio activo no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el servicio activo' });
  }
};

// Mover un servicio activo a suspendidos
exports.suspendActivo = async (req, res) => {
  const { id } = req.params;
  const { motivo_suspension } = req.body;

  try {
    // Mover los datos del activo a la tabla de suspendidos
    const result = await pool.query(
      `INSERT INTO suspendidos (id_servicio, nombre_cliente, cc_nit, celular, email, direccion, placa, imei_gps, 
        fecha_instalacion, pago_inicial, valor_mensualidad, valor_total, proximo_pago, motivo_suspension)
       SELECT id_servicio, nombre_cliente, cc_nit, celular, email, direccion, placa, imei_gps, fecha_instalacion, 
        pago_inicial, valor_mensualidad, valor_total, proximo_pago, $1
       FROM activos WHERE id_servicio = $2 RETURNING *`,
      [motivo_suspension, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Servicio activo no encontrado' });
    }

    // Eliminar el servicio de la tabla activos
    await pool.query('DELETE FROM activos WHERE id_servicio = $1', [id]);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al suspender el servicio' });
  }
};

// Eliminar un servicio activo por su ID
exports.deleteActivo = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM activos WHERE id_servicio = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Servicio activo no encontrado' });
    }

    res.json({ message: 'Servicio activo eliminado con éxito', servicio: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el servicio activo' });
  }
};