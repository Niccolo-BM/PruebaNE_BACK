const findAllNotesRepo = require('../repositories/findAllNotesRepo');

async function getAllNotesService() {
  return findAllNotesRepo();
}

module.exports = getAllNotesService;
