import express from 'express';
import { RatingsService } from '../services';

const ratingsRoute = express.Router();

ratingsRoute.get('/:movieId', RatingsService.getRating);
ratingsRoute.post('/', RatingsService.addRating);
ratingsRoute.put('/', RatingsService.changeRating);
ratingsRoute.delete('/:id', RatingsService.removeRating);

export { ratingsRoute };
