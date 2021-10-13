import joi from 'joi';

export const ratingsValidation = joi.object({
	movieId: joi.number().required(),
	rating: joi.number().min(1).max(5),
});
