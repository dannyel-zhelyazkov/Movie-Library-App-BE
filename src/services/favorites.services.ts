import { NextFunction, Request, Response } from 'express';
import { favoriteDto, favoritesDto, favoritesIdsDto } from '../dtos';
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
import { createFavorites } from '../validations';

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
			if (err) res.status(500).send({ error: err.message });

			const plusOnePage = count % FAVORITE_MOVIES_PER_PAGE > 0;
			const pages =
				Math.floor(count / FAVORITE_MOVIES_PER_PAGE) + (plusOnePage ? 1 : 0);

			res.send({
				favorites: favoritesDto(favorites),
				favoritesIds: favoritesIdsDto(favoritesIds),
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

		try {
			const favorite = await createFavorites.validateAsync({
				movieId: id,
				title: title,
				poster: poster,
			});

			FavoriteModel.create(favorite, (err: any, result: FavoriteSchema) => {
				if (err) {
					res.send({ error: err.message });
					return next();
				}

				res.send(favoriteDto(result));
			});
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	};
	public static removeFavorites = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { id } = req.params;

		try {
			const deleted = await FavoriteModel.findByIdAndDelete(id);

			if (deleted) {
				res.send({
					message: `Successfully removed favorite movie ${id} from Favorites`,
				});

				return next();
			}

			res.status(404).send({
				error: 'The movie was not found!',
			});
		} catch (err) {
			res.status(400).send({ error: err.message });
		}
	};
}
