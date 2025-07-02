const databaseManager = require('../../../config/database');
const { createNotFoundError } = require('../../../shared/errors/AppError');
const { ObjectId } = require('mongodb');

async function deleteNoteRepo(id) {
  const db = await databaseManager.connectMongoDB();
  const collection = db.collection('notes');
  const objectId = ObjectId.createFromHexString(id);
  const result = await collection.deleteOne({ _id: objectId });
  if (result.deletedCount !== 1) {
    throw createNotFoundError('Nota');
  }
  return { id };
}

module.exports = deleteNoteRepo;
