const Joi = require('joi');

const createNoteSchema = Joi.object({
  type: Joi.string()
    .valid('recaudo', 'incidencia', 'mantenimiento')
    .required()
    .messages({
      'any.required': 'Tipo es requerido',
      'any.only': 'Tipo debe ser uno de recaudo, incidencia o mantenimiento',
    }),
  title: Joi.string()
    .min(1)
    .max(100)
    .required()
    .messages({
      'string.empty': 'Título es requerido',
      'string.min': 'Título no puede estar vacío',
      'string.max': 'Título no puede exceder 100 caracteres',
    }),
  content: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.empty': 'Descripción es requerida',
    }),
  route: Joi.string()
    .min(1)
    .required()
    .messages({
      'string.empty': 'Ruta es requerida',
    }),
  amount: Joi.when('type', {
    is: 'recaudo',
    then: Joi.number().precision(2).required().messages({
      'number.base': 'Monto debe ser un número',
      'number.precision': 'Monto puede tener como máximo 2 decimales',
      'any.required': 'Monto es requerido para recaudo',
    }),
    otherwise: Joi.number().precision(2).optional().allow(null),
  }),
});

module.exports = { createNoteSchema };
