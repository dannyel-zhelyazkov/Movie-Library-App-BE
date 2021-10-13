import { NextFunction, Request, Response } from 'express';
import { changeRatingDto, ratingDto } from '../dtos';
import { RatingModel } from '../models';

export class RatingsService {
	public static getRating = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { movieId } = req.params;

		const rating = await RatingModel.find().where({ movieId: movieId });

		if (rating.length === 0) {
			res.send({ rating: 0 });
			return next();
		}

		res.send(ratingDto(rating[0]));
	};

	public static addRating = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { rating, movieId } = req.body;

		RatingModel.create({ movieId: movieId, rating: rating }, (err, result) => {
			if (err) {
				res.send({ error: err.message });
				return next();
			}

			res.send(ratingDto(result));
		});
	};

	public static changeRating = async (req: Request, res: Response) => {
		const { rating, movieId } = req.body;

		try {
			const a = await RatingModel.updateOne(
				{ movieId: movieId },
				{ rating: rating },
			);

			res.send(changeRatingDto(movieId, rating));
		} catch (err) {
			res.send({ error: 'The movie was not found!' });
		}
	};

	public static removeRating = async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			await RatingModel.deleteOne({
				_id: id,
			});

			res.send({
				message: `Successfully removed rating from movie ${id}`,
			});
		} catch (err) {
			res.send({ error: err.message });
		}
	};
}
