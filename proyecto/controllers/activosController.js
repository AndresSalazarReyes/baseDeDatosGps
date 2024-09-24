const pool = require('../config/db');


// Obtener todos los servicios activos
exports.getAllActivos = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM activos');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los servicios activos' });
  }
};



// ver servicio activo por la placa
exports.getActivoByPlaca = async (req, res) => {
  const { placa } = req.params; // Cambiar de req.query a req.params
  console.log('Buscando la placa:', placa); // Verificar si el parámetro se está recibiendo correctamente

  try {
    // Ejecutar la consulta
    const result = await pool.query('SELECT * FROM activos WHERE placa = $1', [placa]);

    // Log para mostrar el resultado de la consulta
    console.log('Resultado de la consulta:', result.rows);

    if (result.rows.length === 0) {
      // Log en caso de que no se encuentre el registro
      console.log('No se encontró la placa en la tabla activos');
      return res.status(404).json({ message: 'Servicio activo no encontrado' });
    }

    // Si se encuentra el activo, responder con el resultado
    res.json(result.rows[0]);
  } catch (error) {
    // Log para el manejo de errores
    console.error('Error al obtener el servicio activo:', error);
    res.status(500).json({ message: 'Error al obtener el servicio activo' });
  }
};





exports.updateActivo = async (req, res) => {
  const { placa } = req.params;
  const {
    nombre_cliente, cc_nit, celular, email, direccion, imei_gps, fecha_instalacion,
    pago_inicial, valor_mensualidad, valor_total, proximo_pago
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE activos SET 
        nombre_cliente = $1, cc_nit = $2, celular = $3, email = $4, direccion = $5, imei_gps = $6, 
        fecha_instalacion = $7, pago_inicial = $8, valor_mensualidad = $9, valor_total = $10, proximo_pago = $11 
       WHERE placa = $12 RETURNING *`,
      [nombre_cliente, cc_nit, celular, email, direccion, imei_gps, fecha_instalacion,
        pago_inicial, valor_mensualidad, valor_total, proximo_pago, placa]
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
  const { placa } = req.params;
  const { motivo_suspension } = req.body;

  try {
    // Mover los datos del activo a la tabla de suspendidos usando la placa
    const result = await pool.query(
      `INSERT INTO suspendidos (id_servicio, nombre_cliente, cc_nit, celular, email, direccion, placa, imei_gps, 
        fecha_instalacion, pago_inicial, valor_mensualidad, valor_total, proximo_pago, motivo_suspension)
       SELECT id_servicio, nombre_cliente, cc_nit, celular, email, direccion, placa, imei_gps, fecha_instalacion, 
        pago_inicial, valor_mensualidad, valor_total, proximo_pago, $1
       FROM activos WHERE placa = $2 RETURNING *`,
      [motivo_suspension, placa]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Servicio activo no encontrado' });
    }

    // Eliminar el servicio de la tabla activos usando la placa
    await pool.query('DELETE FROM activos WHERE placa = $1', [placa]);

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