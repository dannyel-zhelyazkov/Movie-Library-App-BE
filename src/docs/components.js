module.exports = {
	components: {
		schemas: {
			Favorites: {
				type: 'object',
				properties: {
					id: {
						type: 'string',
						description: 'The id of the favorite movie',
						example: false,
					},
					movieId: {
						type: 'number',
						description: 'The id of the movie',
						example: false,
					},
					poster: {
						type: 'string',
						description: 'The poster of the favorite movie',
						example: false,
					},
				},
			},
			Notes: {
				type: 'object',
				properties: {
					id: {
						type: 'string',
						description: 'The id of the note',
						example: false,
					},
					movieId: {
						type: 'number',
						description: 'The id of the movie',
						example: false,
					},
					notes: {
						type: 'string',
						description: 'Private notes for the movie',
						example: 'The first 30 mins of the movie was amazing.',
					},
				},
			},
			Rating: {
				type: 'object',
				properties: {
					id: {
						type: 'string',
						description: 'The id of the rating',
						example: false,
					},
					movieId: {
						type: 'number',
						description: 'The id of the movie',
						example: false,
					},
					rating: {
						type: 'number',
						description: 'The given rating for the movie',
						example: false,
					},
				},
			},
		},
	},
};
