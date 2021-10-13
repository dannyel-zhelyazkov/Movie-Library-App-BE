import { parseYear, getGenresName, combineOfficialPage } from '../utils';
import {
	MovieItemResponse,
	MovieItemResult,
	GenresResponse,
	Genre,
	DetailedMovieResponse,
} from '../client';

export const searchMoviesDto = (
	movies: MovieItemResponse,
	genres: GenresResponse,
) => {
	return movies.results.map((item: MovieItemResult) => ({
		id: item.id,
		title: item.title,
		poster: item.poster_path,
		genres: getGenresName(item.genre_ids, genres.genres),
		releaseDate: parseYear(item.release_date),
		description: item.overview,
		officialPage: combineOfficialPage(item.id, item.title),
	}));
};

export const searchMovieDto = (movie: DetailedMovieResponse) => {
	return {
		id: movie.id,
		description: movie.overview,
		poster: movie.poster_path,
		title: movie.title,
		releaseDate: parseYear(movie.release_date),
		genres: movie.genres.map((g: Genre) => g.name),
		officialPage: combineOfficialPage(movie.id, movie.title),
	};
};
