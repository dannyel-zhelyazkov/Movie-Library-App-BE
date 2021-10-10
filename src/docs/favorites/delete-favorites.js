module.exports = {
	delete: {
		tags: ['Favorites'],
		description: 'Delete Favorites',
		operationId: 'deleteFavorites',
		parameters: [
			{
				name: 'id',
				in: 'path',
				required: true,
				description: 'The id of the favorite movie',
			},
		],
		responses: {
			200: {
				description: 'The movie was removed from favorites',
				content: {
					'application/json': {
						message: 'The movie was removed from favorites',
					},
				},
			},
		},
	},
};
