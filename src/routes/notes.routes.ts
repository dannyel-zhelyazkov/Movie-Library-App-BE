import express from 'express';
import { NotesService } from '../services';

const notesRoute = express.Router();

notesRoute.get('/:movieId', NotesService.getNotes);
notesRoute.post('/', NotesService.addNotes);
notesRoute.put('/', NotesService.changeNotes);
notesRoute.delete('/:id', NotesService.removeNotes);

export { notesRoute };
