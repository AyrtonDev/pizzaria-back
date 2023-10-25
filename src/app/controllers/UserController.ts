import {type Request, type Response} from 'express';
import {ResponseDefault} from '../../models/DefaultResponse';
import UserService from '../services/UserService';
import UserRepository from '../repositories/UserRepository';
import {type UserRequireProps} from '../../models/User';
import formatUserObj from '../../util/formatUserObj';


class UserController {
	async update(req: Request, res: Response) {
		const user = req.body as UserRequireProps;
		const email = req.body.email as string;

		if (!user.name) {
			const response = new ResponseDefault(false, 'Field "name" is empty', null);

			res.status(400);
			return res.json(response);
		}

		if (!user.street) {
			const response = new ResponseDefault(false, 'Field "street" is empty', null);

			res.status(400);
			return res.json(response);
		}

		if (!user.district) {
			const response = new ResponseDefault(false, 'Field "district" is empty', null);

			res.status(400);
			return res.json(response);
		}

		if (!user.number) {
			const response = new ResponseDefault(false, 'Field "number" is empty', null);

			res.status(400);
			return res.json(response);
		}

		if (!user.zipcode || user.zipcode.toString().length < 8) {
			const response = new ResponseDefault(false, 'Field "zipcode" is empty or incorrect', null);

			res.status(400);
			return res.json(response);
		}

		if (!user.phone || user.phone.toString().length < 12) {
			const response = new ResponseDefault(false, 'Field "phone" is empty or incorrect', null);

			res.status(400);
			return res.json(response);
		}

		const userFormat = formatUserObj(user);

		const userUpdated = await UserService.update(email, userFormat, UserRepository);

		if (userUpdated instanceof Error) {
			const response = new ResponseDefault(false, userUpdated.message, null);

			res.status(404);
			return res.json(response);
		}

		const response = new ResponseDefault(true, `User ${userUpdated.id} was updated`, null);

		res.status(200);
		return res.json(response);
	}

	async changePassword(req: Request, res: Response) {
		const {password, newPassword, email} = req.body as {password?: string; newPassword?: string; email?: string};
		let isRightPassword = false;

		if (!email) {
			const response = new ResponseDefault(false, 'E-mail is required', null);

			res.status(400);
			return res.json(response);
		}

		const user = await UserService.one({email}, UserRepository);

		if (user instanceof Error) {
			const response = new ResponseDefault(false, 'User not found', null);

			res.status(404);
			return res.json(response);
		}

		if (!password) {
			const response = new ResponseDefault(false, 'Password is required', null);

			res.status(400);
			return res.json(response);
		}

		isRightPassword = await UserService.match(password, user.password);

		if (!newPassword) {
			const response = new ResponseDefault(false, 'New password is required', null);

			res.status(400);
			return res.json(response);
		}

		if (isRightPassword) {
			const result = await UserService.updatePassword(newPassword, email, UserRepository);

			if (result instanceof Error) {
				const response = new ResponseDefault(false, result.message, null);

				res.status(400);
				return res.json(response);
			}

			const response = new ResponseDefault(true, 'Password was changed', null);

			res.status(200);
			return res.json(response);
		}

		const response = new ResponseDefault(false, 'Password is incorrect', null);

		res.status(400);
		return res.json(response);
	}
}

export default new UserController()

// eslint-disable-next-line no-warning-comments
// TODO: create list and changes in the users
