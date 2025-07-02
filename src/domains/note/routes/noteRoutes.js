const express = require('express');
const { createNote, getNotes, getNoteStats, deleteNote } = require('../controllers/NoteController');
const validateRequest = require('../../../shared/middleware/validation');
const { createNoteSchema } = require('../validators/createNoteValidator');

const router = express.Router();

router.post('/', validateRequest(createNoteSchema), createNote);

router.get('/', getNotes);
router.get('/stats', getNoteStats);
router.delete('/:id', deleteNote);

module.exports = router;
