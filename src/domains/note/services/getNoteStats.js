const getNoteStatsRepo = require('../repositories/getNoteStatsRepo');

async function getNoteStatsService() {
  return getNoteStatsRepo();
}

module.exports = getNoteStatsService;
