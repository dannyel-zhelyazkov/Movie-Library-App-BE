import { Request, Response, NextFunction } from 'express';
import { notesValidation } from '../validations';
import { changeNotesDto, notesDto } from '../dtos';
import { NotesModel, NotesSchema } from '../models';

export class NotesService {
	public static getNotes = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { movieId } = req.params;

		const notes = await NotesModel.find().where({ movieId: movieId });

		if (notes.length !== 0) {
			res.send(notesDto(notes[0]));
			return next();
		}

		res.status(404).send({ error: 'The move was not found!' });
	};

	public static addNotes = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { notes, movieId } = req.body;

		try {
			const notesResult = await notesValidation.validateAsync({
				notes,
				movieId,
			});

			NotesModel.create(notesResult, (err: any, result: NotesSchema) => {
				if (err) {
					res.status(500).send({ error: err.message });
					return next();
				}

				res.send(notesDto(result));
			});
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	};

	public static changeNotes = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { notes, movieId } = req.body;

		try {
			const notesResult = await notesValidation.validateAsync({
				notes,
				movieId,
			});

			const updated = await NotesModel.updateOne(
				{ movieId: notesResult.movieId },
				{ notes: notesResult.notes },
			);

			if (updated.matchedCount !== 0) {
				res.send(changeNotesDto(movieId, notes));
				return next();
			}

			res.status(404).send({ error: 'The movie was not found!' });
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	};

	public static removeNotes = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { id } = req.params;

		try {
			const deleted = await NotesModel.findByIdAndDelete(id);

			if (deleted) {
				res.send({
					message: `Successfully removed notes from movie ${id}`,
				});
				return next();
			}

			res.status(404).send({
				error: 'The movie was not found!',
			});
		} catch (err) {
			res.status(500).send({ error: err.message });
		}
	};
}
