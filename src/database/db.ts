import {connect, disconnect} from 'mongoose';

const uri = Bun.env.URI_MONGODB_CONNECT!;

export const mongoConnect = async () => {
	try {
		await connect(uri);
		console.log('MongoDB Connected');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
	}
};

export const mongoDisconnect = async () => {
	console.log('MongoDB is disconnecting...');
	await disconnect();
};
