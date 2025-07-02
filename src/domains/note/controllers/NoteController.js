const asyncHandler = require('../../../shared/middleware/asyncHandler');
const { successResponse } = require('../../../shared/utils/ApiResponse');
const createNoteService = require('../services/createNote');
const getAllNotesService = require('../services/getAllNotes');
const getNoteStatsService = require('../services/getNoteStats');
const deleteNoteService = require('../services/deleteNote');

const createNote = asyncHandler(async (req, res) => {
  const note = await createNoteService(req.body);
  return successResponse(res, note, 'Nota creada exitosamente', 201);
});

const getNotes = asyncHandler(async (req, res) => {
  const notes = await getAllNotesService();
  return successResponse(res, notes, 'Notas obtenidas exitosamente');
});

const getNoteStats = asyncHandler(async (req, res) => {
  const stats = await getNoteStatsService();
  return successResponse(res, stats, 'Estadísticas de notas obtenidas exitosamente');
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await deleteNoteService(id);
  return successResponse(res, { id }, 'Nota eliminada exitosamente');
});

module.exports = {
  createNote,
  getNotes,
  getNoteStats,
  deleteNote
};
