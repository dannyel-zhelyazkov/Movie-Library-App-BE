module.exports = {
	post: {
		tags: ['Favorites'],
		description: 'Post Favorites',
		operationId: 'postFavorites',
		parameters: [
			{
				name: 'movieId',
				in: 'body',
				required: true,
				description: 'The id of the movie',
			},
		],
		responses: {
			200: {
				description: 'Favorites were saved',
				content: {
					'application/json': {
						schema: {
							$ref: '#/components/schemas/Favorites',
						},
					},
				},
			},
		},
	},
};
