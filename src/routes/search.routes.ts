import express from 'express';
import { SearchService } from '../services';

const searchRoute = express.Router();

searchRoute.get('/', SearchService.findMovieByTitle);
searchRoute.get('/:id', SearchService.findMovieById);

export { searchRoute };
