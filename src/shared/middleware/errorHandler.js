const { isOperationalError } = require('../errors/AppError');

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  if (isOperationalError(err)) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        statusCode: err.statusCode,
      },
    });
  }

  if (err.isJoi) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation error',
        details: err.details.map(detail => detail.message),
        statusCode: 400,
      },
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      error: {
        message: 'Duplicate field value',
        statusCode: 409,
      },
    });
  }

  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      statusCode: 500,
    },
  });
};

module.exports = errorHandler;
