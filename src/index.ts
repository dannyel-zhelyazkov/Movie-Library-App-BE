import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './database';
import { favoriteRoute, ratingsRoute, searchRoute } from './routes';

dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
	}),
);
app.use(express.urlencoded());
app.use(express.json());

app.use('/favorites', favoriteRoute);
app.use('/search', searchRoute);
app.use('/ratings', ratingsRoute);

connectDb().then(() =>
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	}),
);
