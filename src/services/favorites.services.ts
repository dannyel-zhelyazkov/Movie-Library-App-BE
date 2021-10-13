import { NextFunction, Request, Response } from 'express';
import {
	FAVORITE_MOVIES_PER_PAGE,
	MATCH_ALL_WHEN_NO_TITLE_PROVIDED,
} from '../const';
import {
	Favorite,
	FavoriteModel,
	FavoriteSchema,
	FavoriteSchemaArray,
} from '../models';

export class FavoritesService {
	public static getFavorites = async (req: Request, res: Response) => {
		const { page, title } = req.query;

		const skipValue = Number(page) - 1 < 0 ? 0 : Number(page) - 1;

		const favoritesIds = await FavoriteModel.find().select(['movieId', '_id']);

		const favorites = await FavoriteModel.find()
			.where({
				title: {
					$regex: title ? title : MATCH_ALL_WHEN_NO_TITLE_PROVIDED,
					$options: 'i',
				},
			})
			.limit(4)
			.skip(skipValue * 4);

		FavoriteModel.where({
			title: {
				$regex: title ? title : MATCH_ALL_WHEN_NO_TITLE_PROVIDED,
				$options: 'i',
			},
		}).count({}, (err, count) => {
			if (err) return;

			const plusOnePage = count % FAVORITE_MOVIES_PER_PAGE > 0;
			const pages =
				Math.floor(count / FAVORITE_MOVIES_PER_PAGE) + (plusOnePage ? 1 : 0);

			res.send({
				favorites: favorites.map((f) => ({
					id: f._id,
					movieId: f.movieId,
					title: f.title,
					poster: f.poster,
				})),
				favoritesIds: favoritesIds.map((fid) => ({
					id: fid._id,
					movieId: fid.movieId,
				})),
				totalPages: pages,
			});
		});
	};
	public static addFavorites = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { id, title, poster } = req.body;

		FavoriteModel.create(
			{
				movieId: id,
				title: title,
				poster: poster,
			},
			(err, small) => {
				if (err) {
					res.send({ ...err });
					next();
				}

				res.send({
					id: small._id,
					movieId: small.movieId,
					title: small.title,
					poster: small.poster,
				});
			},
		);
	};
	public static removeFavorites = async (req: Request, res: Response) => {
		const { id } = req.params;

		try {
			await FavoriteModel.deleteOne({
				_id: id,
			});

			res.send({
				message: `Successfully removed favorite movie ${id} from Favorites`,
			});
		} catch (err) {
			res.send({ message: err.message });
		}
	};
}
