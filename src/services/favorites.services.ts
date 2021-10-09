import { NextFunction, Request, Response } from 'express';
import { FavoriteModel } from '../models';

export class FavoritesService {
	public static getFavorites = async (req: Request, res: Response) => {
		const all = await FavoriteModel.find();

		res.send([...all]);
	};
	public static addFavorites = async (
		req: Request,
		res: Response,
		next: NextFunction,
	) => {
		const { id, poster } = req.body;

		FavoriteModel.create(
			{
				movieId: id,
				poster: poster,
			},
			(err, small) => {
				if (err) {
					res.send({ ...err });
					next();
				}

				res.send(small);
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
