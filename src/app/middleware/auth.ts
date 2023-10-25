import {type NextFunction, type Request, type Response} from 'express';
import {ResponseDefault} from '../../models/DefaultResponse';
import UserService from '../services/UserService';
import * as jose from 'jose';
import UserRepository from '../repositories/UserRepository';
import verifyEmailByToken from '../../util/verifyEmailByToken';

const secretKey = Bun.env.JWT_SECRET_KEY!;

export default class Auth {
	async private(req: Request, res: Response, next: NextFunction) {
		let success = false;

		if (req.headers.authorization) {
			const jwtToken = req.headers.authorization.split(' ')[1];

			if (!jwtToken) {
				return res.status(401).send('Token header is empty');
			}

			try {
				const {payload} = await jose.jwtVerify(jwtToken, new TextEncoder().encode(secretKey));

				const email = payload.email as string;

				const user = await UserService.one({email}, UserRepository);

				const passEmail = verifyEmailByToken(req.path);

				if (passEmail) {
					req.body.email = email;
				}

				if (user) {
					success = true;
				}
			} catch (error) {
				res.status(401).send('Error validating JWT token');
			}
		}

		if (success) {
			next();
		} else {
			const response = new ResponseDefault(false, 'Not permitted to access without a token valid', null);

			res.status(403);
			return res.json(response);
		}
	}
}

// eslint-disable-next-line no-warning-comments
// TODO: to vary in the middlewares depending of type account
