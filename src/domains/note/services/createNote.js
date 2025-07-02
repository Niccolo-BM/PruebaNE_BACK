const createNoteRepo = require('../repositories/createNoteRepo');
const { noteSchema } = require('../models/Note');
const { createValidationError } = require('../../../shared/errors/AppError');

async function createNoteService(noteData) {
  const { error } = noteSchema.validate(noteData);
  if (error) throw createValidationError(error.details[0].message);
  return createNoteRepo(noteData);
}

module.exports = createNoteService;
