import {type UpdateDataProps, type UserProps} from '../../models/User';
import SearchQueryProps from '../../types/searchQueryProps';
import {type UserRepository} from '../repositories/UserRepository';

class UserServices {
	async create(user: UserProps, UserRepository: UserRepository) {
		const hasUserCpf = await UserRepository.one({document: user.document});
		const hasUserEmail = await UserRepository.one({email: user.email});

		if (!hasUserCpf && !hasUserEmail) {
			const hash = await Bun.password.hash(user.password);
			const newUser = UserRepository.create();

			newUser.name = user.name;
			newUser.email = user.email;
			newUser.password = hash;
			newUser.address = user.address;
			newUser.document = user.document;
			newUser.phone = user.phone;

			return await UserRepository.save(newUser);
		}

		return new Error('CPF or Email is already register');
	}

	async one(search: SearchQueryProps, UserRepository: UserRepository) {
		const user = await UserRepository.one(search);

		if (user === null) {
			return new Error('User not found');
		}

		return user;
	}

	async match(password: string, encrypted: string) {
		return await Bun.password.verify(password, encrypted);
	}

	async updatePassword(password: string, email: string, UserRepository: UserRepository) {
		const user = await UserRepository.one({email});

		if (user instanceof Error) {
			return user;
		}

		if (user === null) {
			throw new Error('User not found');
		}

		const hash = await Bun.password.hash(password);
		user.password = hash;

		return await UserRepository.save(user);
	}

	async update(email: string, newDataUser: UpdateDataProps, UserRepository: UserRepository) {
		const user = await UserRepository.one({email});

		if (user instanceof Error) {
			return user;
		}

		if (user === null) {
			throw new Error('User not found');
		}

		user.name = newDataUser.name;
		user.address = newDataUser.address;
		user.phone = newDataUser.phone;

		return await UserRepository.save(user);
	}
}

export default new UserServices()
