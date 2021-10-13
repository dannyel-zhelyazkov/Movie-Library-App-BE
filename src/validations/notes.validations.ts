import joi from 'joi';

export const notesValidation = joi.object({
	movieId: joi.number().required(),
	notes: joi.string().max(600),
});
