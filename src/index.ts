import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const port = process.env.SERVER_PORT;

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
	}),
);

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
