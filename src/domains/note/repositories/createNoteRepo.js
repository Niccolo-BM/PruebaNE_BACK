const databaseManager = require('../../../config/database');
const { createValidationError } = require('../../../shared/errors/AppError');
const { createNote: buildNote, toDocument, fromDocument } = require('../models/Note');

async function getCollection() {
  const db = await databaseManager.connectMongoDB();
  return db.collection('notes');
}

async function createNoteRepo(noteData) {
  const note = buildNote(noteData);
  const document = toDocument(note);
  const collection = await getCollection();
  const result = await collection.insertOne(document);
  if (!result.acknowledged || !result.insertedId) {
    throw createValidationError('No se pudo crear la nota');
  }
  return fromDocument({ _id: result.insertedId, ...document });
}

module.exports = createNoteRepo;
