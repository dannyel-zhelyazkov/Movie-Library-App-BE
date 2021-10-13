import axios from 'axios';
import dotenv from 'dotenv';
import { searchMoviesDto, searchMovieDto } from '../dtos';
import { parseYear, combineOfficialPage, getGenresName } from '../utils';
import {
	DetailedMovieResponse,
	Genre,
	GenresResponse,
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
		page: string,
		titleQuery: string,
	): Promise<MovieItems> => {
		const res = await axios.get(
			`${this.baseUrl}/search/movie?api_key=${this.apiKey}&page=${page}&query=${titleQuery}`,
		);

		const resGenres = await axios.get(
			`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`,
		);

		const movies = res.data as MovieItemResponse;
		const genres = resGenres.data as GenresResponse;

		return {
			items: searchMoviesDto(movies, genres),
			pages: movies.total_pages,
		};
	};

	public static getMovie = async (id: number): Promise<MovieItem> => {
		const { data } = await axios.get(
			`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`,
		);

		const movie = data as DetailedMovieResponse;

		return searchMovieDto(movie);
	};
}
