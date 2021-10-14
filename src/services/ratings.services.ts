import { NextFunction, Request, Response } from 'express';
import { ratingsValidation } from '../validations';
import { changeRatingDto, ratingDto } from '../dtos';
import { RatingModel, RatingSchema } from '../models';
import { nextTick } from 'process';

export class RatingsService {
	public static getRating = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { movieId } = req.params;

		const rating = await RatingModel.find().where({ movieId: movieId });

		if (rating.length !== 0) {
			res.send(ratingDto(rating[0]));
			return next();
		}

		res.send({ rating: 0 });
	};

	public static addRating = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { rating, movieId } = req.body;

		try {
			const ratingResult = await ratingsValidation.validateAsync({
				rating,
				movieId,
			});

			RatingModel.create(ratingResult, (err: any, result: RatingSchema) => {
				if (err) {
					res.status(500).send({ error: err.message });
					return next();
				}

				res.send(ratingDto(result));
			});
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	};

	public static changeRating = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { rating, movieId } = req.body;

		try {
			const ratingResult = await ratingsValidation.validateAsync({
				rating,
				movieId,
			});

			const updated = await RatingModel.updateOne(
				{ movieId: ratingResult.movieId },
				{ rating: ratingResult.rating },
			);

			if (updated.matchedCount !== 0) {
				res.send(changeRatingDto(movieId, rating));
				return next();
			}

			res.status(404).send({ error: 'The movie was not found!' });
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	};

	public static removeRating = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { id } = req.params;

		try {
			const deleted = await RatingModel.findByIdAndDelete(id);

			if (deleted) {
				res.send({
					message: `Successfully removed rating from movie ${id}`,
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
