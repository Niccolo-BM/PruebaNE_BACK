const createSuccessResponse = (data, message = 'Success', statusCode = 200) => ({
  success: true,
  message,
  data,
  statusCode,
  timestamp: new Date().toISOString(),
});

const createErrorResponse = (message, statusCode = 500, errors = null) => ({
  success: false,
  message,
  statusCode,
  errors,
  timestamp: new Date().toISOString(),
});

const createPaginatedResponse = (data, pagination, message = 'Success') => ({
  success: true,
  message,
  data,
  pagination,
  timestamp: new Date().toISOString(),
});

const successResponse = (res, data, message, statusCode = 200) => {
  return res.status(statusCode).json(createSuccessResponse(data, message, statusCode));
};

const errorResponse = (res, message, statusCode = 500, errors = null) => {
  return res.status(statusCode).json(createErrorResponse(message, statusCode, errors));
};

const paginatedResponse = (res, data, pagination, message = 'Success') => {
  return res.status(200).json(createPaginatedResponse(data, pagination, message));
};

module.exports = {
  createSuccessResponse,
  createErrorResponse,
  createPaginatedResponse,
  successResponse,
  errorResponse,
  paginatedResponse,
};
