interface MovieItemResult {
	poster_path: string;
	overview: string;
	release_date: string;
	genre_ids: Array<number>;
	id: number;
	title: string;
}

interface Genre {
	id: number;
	name: string;
}

interface MovieItemResponse {
	results: Array<MovieItemResult>;
}

interface DetailedMovieResponse {
	poster_path: string;
	genres: Array<Genre>;
	id: number;
	title: string;
	overview: string;
	release_date: string;
}

interface MovieItem {
	id: number;
	title: string;
	poster: string;
	genreIds: Array<number>;
	releaseDate: string;
	description: string;
}
