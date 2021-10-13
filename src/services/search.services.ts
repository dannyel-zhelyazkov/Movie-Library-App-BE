import { Request, Response } from 'express';
import { TmdbApi } from '../client';

export class SearchService {
	public static findMovieByTitle = async (req: Request, res: Response) => {
		const { page, title } = req.query;

		try {
			const data = await TmdbApi.searchMovies(
				page.toString(),
				title.toString(),
			);

			res.send(data);
		} catch (err) {
			res.send({ message: 'No movies were found with similar name!' });
		}
	};

	public static findMovieById = async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			const data = await TmdbApi.getMovie(Number(id));

			res.send(data);
		} catch (err) {
			res.send({ message: 'The movie was not found!' });
		}
	};
}
