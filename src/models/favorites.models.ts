import { model, Schema } from 'mongoose';

interface Favorite {
	movieId: number;
	poster: string;
}

const schema = new Schema<Favorite>({
	movieId: { type: Number, required: true },
	poster: { type: String, required: false },
});

export const FavoriteModel = model<Favorite>('Favorite', schema);
