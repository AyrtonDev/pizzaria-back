import {type UserRepository} from '../app/repositories/UserRepository';
import SearchQueryProps from '../types/searchQueryProps';
import {type UserProps} from '../models/User';
import { Document, ObjectId } from 'mongoose';

type MockProps = Document & UserProps & Required<{ _id: string | ObjectId }>

export const userMock = [{
	_id: '12345',
	name: 'Test',
	email: 'invalid',
	password: 'password',
	document: 0,
	phone: 99999999999,
	address: {
		street: 'test',
		district: 'test',
		number: '9',
		complement: '',
		zipcode: 99999999,
	},
	favoritePizzas: [],
}];

export const userNewMock = {
	name: '',
	email: '',
	password: '',
	address: {
		district: '',
		number: '',
		street: '',
		zipcode: 0,
		complement: '',
	},
	document: 0,
	phone: 0,
	favoritePizzas: [],
};

export const userMockMethod: UserRepository = {
	async all() {
      return await userMock as MockProps[];
  },
	async one(search: SearchQueryProps) {
    if (search.email === 'invalid') {
      return await null;
    }

    if (search.document === 0) {
      return await null;
    }

    return await userMock[0] as MockProps;
  },
  create() {
		return userNewMock as MockProps;
	},
  async save(data) {
    return await userMock[0] as MockProps
  }

};
