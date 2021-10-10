import { Genre } from '../client/types';

export const getGenresName = (genreIds: number[], genres: Genre[]) => {
	return genres.filter((g) => genreIds.includes(g.id)).map((g) => g.name);
};
