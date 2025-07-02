const createAppError = (message, statusCode, isOperational = true) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = isOperational;
  error.name = 'AppError';
  return error;
};

const createValidationError = (message) => {
  const error = createAppError(message, 400);
  error.name = 'ValidationError';
  return error;
};

const createNotFoundError = (resource = 'Resource') => {
  const error = createAppError(`${resource} not found`, 404);
  error.name = 'NotFoundError';
  return error;
};

const createUnauthorizedError = (message = 'Unauthorized') => {
  const error = createAppError(message, 401);
  error.name = 'UnauthorizedError';
  return error;
};

const createConflictError = (message) => {
  const error = createAppError(message, 409);
  error.name = 'ConflictError';
  return error;
};

const isOperationalError = (error) => {
  return error.isOperational === true;
};

module.exports = {
  createAppError,
  createValidationError,
  createNotFoundError,
  createUnauthorizedError,
  createConflictError,
  isOperationalError,
};
