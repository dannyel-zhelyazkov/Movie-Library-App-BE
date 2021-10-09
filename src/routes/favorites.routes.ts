import express from 'express';
import { FavoritesService } from '../services';

const favoriteRoute = express.Router();

favoriteRoute.get('/', FavoritesService.getFavorites);
favoriteRoute.post('/', FavoritesService.addFavorites);
favoriteRoute.delete('/:id', FavoritesService.removeFavorites);

export { favoriteRoute };
