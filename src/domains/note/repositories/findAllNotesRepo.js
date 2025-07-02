const databaseManager = require('../../../config/database');
const { fromDocument } = require('../models/Note');

async function findAllNotesRepo() {
  const db = await databaseManager.connectMongoDB();
  const collection = db.collection('notes');
  const docs = await collection.find().sort({ createdAt: -1 }).toArray();
  return docs.map(fromDocument);
}

module.exports = findAllNotesRepo;
