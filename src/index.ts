import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDb } from './database';
import { favoriteRoute, notesRoute, ratingsRoute, searchRoute } from './routes';
import swaggerUI from 'swagger-ui-express';

const docs = require('./docs');

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

app.use(
	'/api-docs',
	swaggerUI.serve,
	swaggerUI.setup(docs, { explorer: true }),
);
app.use('/favorites', favoriteRoute);
app.use('/search', searchRoute);
app.use('/ratings', ratingsRoute);
app.use('/notes', notesRoute);

connectDb().then(() =>
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	}),
);

module.exports = app;
