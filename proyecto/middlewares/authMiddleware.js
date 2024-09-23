const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extraer el token del encabezado

  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Token inválido' });

    req.userId = decoded.id_personal; // Guardar el ID del usuario decodificado
    req.userRole = decoded.rol; // Guardar el rol del usuario decodificado
    next();
  });
};

// Middleware para verificar si el usuario es admin
exports.isAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({ message: 'Requiere rol de administrador' });
  }
  next();
};

// Middleware para verificar si el usuario es empleado
exports.isEmpleado = (req, res, next) => {
  if (req.userRole !== 'empleado') {
    return res.status(403).json({ message: 'Requiere rol de empleado' });
  }
  next();
};

exports.isAdminOrEmpleado = (req, res, next) => {
  if (req.userRole !== 'admin' && req.userRole !== 'empleado') {
    return res.status(403).json({ message: 'Requiere rol de administrador o empleado' });
  }
  next();
};
