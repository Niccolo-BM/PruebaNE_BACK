const findAllNotesRepo = require('./findAllNotesRepo');

async function getNoteStatsRepo() {
  const notes = await findAllNotesRepo();
  const totalRecaudado = notes
    .filter(n => n.type === 'recaudo' && n.amount != null)
    .reduce((sum, { amount }) => sum + Number(amount), 0);
  const incidenciasCount = notes.filter(n => n.type === 'incidencia').length;
  const totalNotes = notes.length;
  return { totalRecaudado, incidenciasCount, totalNotes };
}

module.exports = getNoteStatsRepo;
