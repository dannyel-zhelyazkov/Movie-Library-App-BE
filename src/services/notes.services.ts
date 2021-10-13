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

		if (notes.length === 0) {
			res.send({ error: 'The move was not found!' });
			return next();
		}

		res.send(notesDto(notes[0]));
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
					res.send({ error: err.message });
					return next();
				}

				res.send(notesDto(result));
			});
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	};

	public static changeNotes = async (req: Request, res: Response) => {
		const { notes, movieId } = req.body;

		try {
			const notesResult = await notesValidation.validateAsync({
				notes,
				movieId,
			});

			await NotesModel.updateOne(
				{ movieId: notesResult.movieId },
				{ notes: notesResult.notes },
			);

			res.send(changeNotesDto(movieId, notes));
		} catch (err) {
			res.send({ error: 'The movie was not found!' });
		}
	};

	public static removeNotes = async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			await NotesModel.deleteOne({
				_id: id,
			});

			res.send({
				message: `Successfully removed notes from movie ${id}`,
			});
		} catch (err) {
			res.send({ error: err.message });
		}
	};
}
