import {type Request, type Response} from 'express';
import {ResponseDefault} from '../../models/DefaultResponse';
import genereteToken from '../../config/jose';
import UserRepository from '../repositories/UserRepository';
import UserService from '../services/UserService';
import {type UserProps} from '../../models/User';

class AuthController {
	async register(req: Request, res: Response) {
		const user = req.body as UserProps;

		const newUser = await UserService.create(user, UserRepository);

		if (newUser instanceof Error) {
			const response = new ResponseDefault(false, newUser.message, null);

			res.status(400);
			return res.json(response);
		}

		const response = new ResponseDefault(true, `User ${newUser.id} was created`, null);

		res.status(201);
		return res.json(response);
	}

	async login(req: Request, res: Response) {
		try {
			const {email, password} = req.body as {email?: string; password?: string};

			if (!email) {
				const response = new ResponseDefault(false, 'Field "email" is empty', null);

				res.status(400);
				return res.json(response);
			}

			if (!password) {
				const response = new ResponseDefault(false, 'Field "password" is empty', null);

				res.status(400);
				return res.json(response);
			}

			const user = await UserService.one({email}, UserRepository);

			if (user instanceof Error) {
				const response = new ResponseDefault(false, user.message, null);

				res.status(400);
				return res.json(response);
			}

			if (user && await UserService.match(password, user.password)) {
				const token = await genereteToken({id: user.id, email: user.email});

				const response = new ResponseDefault(true, '', token);

				res.status(200);
				return res.json(response);
			}

			const response = new ResponseDefault(false, 'Password is wrong', null);

			res.status(400);
			return res.json(response);
		} catch (error) {
			console.error('ERROR LOGIN: ', error);
		}
	}
}

export default new AuthController()
