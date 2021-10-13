import joi from 'joi';

export const createFavorites = joi.object({
	movieId: joi.number().required(),
	title: joi.string().required(),
	poster: joi.string(),
});
