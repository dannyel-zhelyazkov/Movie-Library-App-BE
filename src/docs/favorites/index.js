const getFavorites = require('./get-favorites');
const postFavorites = require('./post-favorites');
const deleteFavorites = require('./delete-favorites');

module.exports = {
	paths: {
		'/favorites': {
			...getFavorites,
			...postFavorites,
		},
		'/favorites/{id}': {
			...deleteFavorites,
		},
	},
};
