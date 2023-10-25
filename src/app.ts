import express, {type ErrorRequestHandler, type Request, type Response} from 'express';
import apiRoutes from './routes';
import {mongoConnect} from './database/db';
import rateLimit from 'express-rate-limit';
import {ResponseDefault} from './models/DefaultResponse';
import swaggerUI from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

const server = express();

server.use(express.json());

// Config documentation in Swagger

server.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Access limiter

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 request per windowMs,
	message: 'Too many requests, please try again later',
	validate: {ip: false},
});

server.use(limiter);

// Connection with Mongo

await mongoConnect();

// Others

server.use(apiRoutes);

server.get('/ping', (req: Request, res: Response) => res.json({pong: true}));

// Error default

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const response = new ResponseDefault(false, 'Error internal', null);

	if (err.status) {
		res.status(err.status as number);
	} else {
		res.status(500);
	}

	if (err.message) {
		res.json({error: err.message as string});
	} else {
		res.json(response);
	}

	next();
};

server.use(errorHandler);

export default server;
