class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  // Error controlado (tu AppError)
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // MySQL: duplicados
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'Ya existe un registro con ese valor único',
    });
  }

  // MySQL: foreign key
  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({
      success: false,
      message: 'Referencia inválida (foreign key)',
    });
  }

  // MySQL: campo null no permitido
  if (err.code === 'ER_BAD_NULL_ERROR') {
    return res.status(400).json({
      success: false,
      message: 'Hay campos obligatorios vacíos',
    });
  }

  // MySQL: dato demasiado largo
  if (err.code === 'ER_DATA_TOO_LONG') {
    return res.status(400).json({
      success: false,
      message: 'Uno de los campos excede el tamaño permitido',
    });
  }

  //Error desconocido
  console.error('Error no controlado:', err);

  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === 'development'
        ? err.message
        : 'Error interno del servidor',
  });
};

const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.originalUrl}`,
  });
};

module.exports = { AppError, errorHandler, notFound };