import { NotesSchema } from '../models';

export const notesDto = (notes: NotesSchema) => {
	return {
		id: notes._id,
		notes: notes.notes,
	};
};

export const changeNotesDto = (movieId: number, notes: string) => {
	return {
		movieId,
		notes,
	};
};
