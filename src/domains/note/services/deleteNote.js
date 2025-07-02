const deleteNoteRepo = require('../repositories/deleteNoteRepo');

async function deleteNoteService(id) {
  return deleteNoteRepo(id);
}

module.exports = deleteNoteService;