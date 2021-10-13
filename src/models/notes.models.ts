import { model, ObjectId, Schema, Document } from 'mongoose';

interface Notes {
	movieId: number;
	notes: string;
}

const schema = new Schema<Notes>({
	movieId: { type: Number, required: true },
	notes: {
		type: String,
		required: false,
		validate: (value: string) => {
			if (value.length <= 160) return true;

			return false;
		},
	},
});

export const NotesModel = model<Notes>('Notes', schema);

export type NotesSchema = Document<any, any, Notes> & Notes & { _id: ObjectId };
