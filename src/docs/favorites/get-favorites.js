module.exports = {
	get: {
		tags: ['Favorites'],
		description: 'Get Favorites',
		operationId: 'getFavorites',
		parameters: [],
		responses: {
			200: {
				description: 'Favorites were obtained',
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
