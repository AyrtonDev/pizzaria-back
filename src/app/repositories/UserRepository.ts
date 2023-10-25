import { Document } from 'mongoose';
import User, {type UserProps} from '../../models/User';
import SearchQueryProps from '../../types/searchQueryProps';

export class UserRepository {
	async all() {
		return await User.find({});
	}

	async one(search: SearchQueryProps) {
		if (search.email) {
			return await User.findOne({email: search.email});
		}

		if (search.document) {
			return await User.findOne({document: search.document});
		}

		try {
			return await User.findById(search.id);
		} catch (error) {
			const err = error as Error;
			console.error('ERROR: ', err);

			return new Error('User not found');
		}
	}

	create() {
		return new User();
	}

 async save(data: UserProps) {
    return await data.save()
  }
}

export default new UserRepository()
