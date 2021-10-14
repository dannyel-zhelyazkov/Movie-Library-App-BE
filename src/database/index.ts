import mongoose from 'mongoose';
import config from 'config';

const connectDb = () => {
	return mongoose.connect(config.get('db.url'));
};

export { connectDb };
