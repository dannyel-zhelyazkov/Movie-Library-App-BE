import { model, ObjectId, Schema, Document } from 'mongoose';

export interface Favorite {
	movieId: number;
	title: string;
	poster: string;
}

const schema = new Schema<Favorite>({
	movieId: { type: Number, required: true },
	title: { type: String, required: true },
	poster: { type: String, required: false },
});

export const FavoriteModel = model<Favorite>('Favorite', schema);

export type FavoriteSchemaArray = Array<
	Document<any, any, Favorite> & Favorite & { _id: ObjectId }
>;
export type FavoriteSchema = Document<any, any, Favorite> &
	Favorite & { _id: ObjectId };
