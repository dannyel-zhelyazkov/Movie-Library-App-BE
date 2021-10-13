import { Request, Response, NextFunction } from 'express';
import { changeNotesDto, notesDto } from '../dtos';
import { NotesModel } from '../models';

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

		NotesModel.create({ movieId: movieId, notes: notes }, (err, result) => {
			if (err) {
				res.send({ error: err.message });
				return next();
			}

			res.send(notesDto(result));
		});
	};

	public static changeNotes = async (req: Request, res: Response) => {
		const { notes, movieId } = req.body;

		try {
			await NotesModel.updateOne({ movieId: movieId }, { notes: notes });

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
