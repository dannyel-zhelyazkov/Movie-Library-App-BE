export interface MovieItemResult {
	poster_path: string;
	overview: string;
	release_date: string;
	genre_ids: Array<number>;
	id: number;
	title: string;
}

export interface Genre {
	id: number;
	name: string;
}

export interface GenresResponse {
	genres: Array<Genre>;
}

export interface MovieItemResponse {
	results: Array<MovieItemResult>;
	total_pages: number;
}

export interface DetailedMovieResponse {
	poster_path: string;
	genres: Array<Genre>;
	id: number;
	title: string;
	overview: string;
	release_date: string;
}

export interface MovieItem {
	id: number;
	title: string;
	poster: string;
	genres: Array<string>;
	releaseDate: string;
	description: string;
	officialPage: string;
}

export interface MovieItems {
	items: Array<MovieItem>;
	pages: number;
}
