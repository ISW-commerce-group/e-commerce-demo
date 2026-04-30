class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Error de MySQL: duplicate entry
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'Ya existe un registro con ese valor único',
    });
  }

  // Error genérico — no exponer detalles en producción
  console.error('Error no controlado:', err);
  return res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor',
  });
};

const notFound = (req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
};

module.exports = { AppError, errorHandler, notFound };