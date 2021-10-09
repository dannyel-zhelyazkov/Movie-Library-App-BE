import express from 'express';
import { FavoritesService } from '../services';

const favoriteRouter = express.Router();

favoriteRouter.get('/', FavoritesService.getFavorites);
favoriteRouter.post('/', FavoritesService.addFavorites);
favoriteRouter.delete('/:id', FavoritesService.removeFavorites);

export { favoriteRouter };
