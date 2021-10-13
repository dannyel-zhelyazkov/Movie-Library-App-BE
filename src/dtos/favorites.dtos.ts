import { FavoriteSchema, FavoriteSchemaArray } from '../models';

export const favoriteDto = (favorite: FavoriteSchema) => {
	return {
		id: favorite._id,
		movieId: favorite.movieId,
		title: favorite.title,
		poster: favorite.poster,
	};
};

export const favoritesDto = (favorites: FavoriteSchemaArray) => {
	return favorites.map((f: FavoriteSchema) => ({
		id: f._id,
		movieId: f.movieId,
		title: f.title,
		poster: f.poster,
	}));
};

export const favoritesIdsDto = (
	favoritesIds: {
		_id: number;
		movieId: number;
	}[],
) => {
	return favoritesIds.map((fid) => ({
		id: fid._id,
		movieId: fid.movieId,
	}));
};
