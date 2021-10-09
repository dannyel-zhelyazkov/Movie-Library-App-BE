import axios from 'axios';
import dotenv from 'dotenv';
import {
	DetailedMovieResponse,
	Genre,
	MovieItem,
	MovieItemResponse,
	MovieItemResult,
	MovieItems,
} from './types';

dotenv.config();

export class TmdbApi {
	private static baseUrl: string = `https://api.themoviedb.org/3`;
	private static apiKey: string = process.env.API_KEY;

	public static searchMovies = async (
		page: number,
		titleQuery: string,
	): Promise<MovieItems> => {
		const res = await axios.get(
			`${this.baseUrl}/search/movie?api_key=${this.apiKey}&page=${page}&query=${titleQuery}`,
		);

		const movies = res.data as MovieItemResponse;

		const items = movies.results.map((item: MovieItemResult) => ({
			id: item.id,
			title: item.title,
			poster: `https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`,
			genreIds: item.genre_ids,
			releaseDate: item.release_date.split('')[0],
			description: item.overview,
		}));

		return {
			items,
			pages: movies.total_pages,
		};
	};

	public static getMovie = async (id: number): Promise<MovieItem> => {
		const { data } = await axios.get(
			`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`,
		);

		const movie = data as DetailedMovieResponse;

		return {
			id: movie.id,
			description: movie.overview,
			poster: `https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`,
			title: movie.title,
			releaseDate: movie.release_date.split('-')[0],
			genreIds: movie.genres.map((g: Genre) => g.id),
		};
	};
}
