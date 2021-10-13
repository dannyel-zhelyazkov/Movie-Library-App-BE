import { RatingSchema } from '../models';

export const ratingDto = (rating: RatingSchema) => {
	return {
		id: rating._id,
		movieId: rating.movieId,
		rating: rating.rating,
	};
};

export const changeRatingDto = (movieId: number, rating: number) => {
	return {
		movieId,
		rating,
	};
};
