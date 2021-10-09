import { model, Schema } from 'mongoose';

interface Rating {
	movieId: number;
	rating: number;
}

const schema = new Schema<Rating>({
	movieId: { type: Number, required: true },
	rating: {
		type: Number,
		required: false,
		validate: (value: number) => {
			if (value >= 1 && value <= 5) return true;

			return false;
		},
	},
});

export const RatingModel = model<Rating>('Rating', schema);
