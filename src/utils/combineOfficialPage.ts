export const combineOfficialPage = (movieId: number, movieTitle: string) => {
	const parseMovieName = movieTitle
		.split(' ')
		.map((word) => word.toLocaleLowerCase())
		.join('-');

	return `https://www.themoviedb.org/movie/${movieId}-${parseMovieName}?language=en`;
};
