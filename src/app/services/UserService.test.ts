import {describe, expect, it} from 'bun:test';
import UserService from './UserService';
import SearchQueryProps from '../../types/searchQueryProps';
import {type UserProps} from '../../models/User';
import {userMock, userMockMethod} from '../../mock/user';

describe('Testing user service', () => {

	it('should create a new user', async () => {
		const data = {...userMock[0], document: 0, email: 'invalid'} as UserProps;
		const newUser = await UserService.create(data, userMockMethod) as UserProps;
		expect(newUser).not.toBeInstanceOf(Error);
		expect(newUser).toHaveProperty('_id');
		expect(newUser.email).toEqual(data.email);
		expect(newUser.document).toEqual(data.document);
	});

	it('should not allow to create a user with existing email', async () => {
		const newUser = await UserService.create({...userMock[0], email: 'test@test.com.br'} as UserProps, userMockMethod);
		expect(newUser).toBeInstanceOf(Error);
	});

	it('should find user by email', async () => {
		const user = await UserService.one({}, userMockMethod) as SearchQueryProps;
		expect(user).not.toBeInstanceOf(Error);
		expect(user).toHaveProperty('_id');
		expect(user.email).toEqual(userMock[0].email);
		expect(user.document).toEqual(userMock[0].document);
	});

	it('should not find user by email', async () => {
		const data = {...userMock[0], email: 'invalid'} as SearchQueryProps;
		const user = await UserService.one(data, userMockMethod);
		expect(user).toBeInstanceOf(Error);
	});

	it('should match the password from database', async () => {
		const hash = await Bun.password.hash(userMock[0].password);
		const match = UserService.match(userMock[0].password, hash);
		expect(match).toBeTruthy();
	});

	it('should not match the password from database', async () => {
		const hash = await Bun.password.hash(userMock[0].password);
		const match = await UserService.match('invalid', hash);
		expect(match).toBeFalsy();
	});

	it('should change the password from database', async () => {
		const user = await UserService.updatePassword('123456', '', userMockMethod) as UserProps;
		const hashOld = await UserService.match(userMock[0].password, user.password);
		const hashNew = await UserService.match('123456', user.password);
		expect(user).not.toBeInstanceOf(Error);
		expect(hashOld).toBeFalsy();
		expect(hashNew).toBeTruthy();
	});
});

// TODO: shall create more test and make better the already exists
