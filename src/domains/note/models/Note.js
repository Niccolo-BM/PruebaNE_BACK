const Joi = require('joi');

const noteSchema = Joi.object({
    type: Joi.string().valid('recaudo', 'incidencia', 'mantenimiento').required(),
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).required(),
    route: Joi.string().min(1).required(),
    amount: Joi.when('type', {
        is: 'recaudo',
        then: Joi.number().precision(2).required(),
        otherwise: Joi.number().precision(2).optional().allow(null),
    }),

});

const createNote = (noteData) => ({
    ...noteData,
    createdAt: new Date(),
    updatedAt: new Date(),
});

const fromDocument = (doc) => ({
    id: doc._id,
    type: doc.type,
    title: doc.title,
    content: doc.content,
    route: doc.route,
    amount: doc.amount || null,
    date: new Date(doc.createdAt).toLocaleDateString('es-ES'),
    time: new Date(doc.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
});

const toDocument = (note) => {
    const { id, ...rest } = note;
    return rest;
};

module.exports = {
    noteSchema,
    createNote,
    fromDocument,
    toDocument,
};
