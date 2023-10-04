import { afterAll, beforeAll, describe, expect, it } from 'bun:test'
import User, { UserProps } from '../models/User'
import * as UserService from './UserService'
import { mongoConnect, mongoDisconnect } from '../instances/db'

describe('Testing user service', () => {

    const mock = {
        name: 'Test',
        email: 'test@test.com.br',
        password: 'password',
        document: 99999999999,
        phone: 99999999999,
        address: {
            street: 'test',
            district: 'test',
            number: 9,
            zipcode: 99999999
        },
        favoritePizzas: []
    }

    const newPassword = 'newPassword'

    beforeAll(async () => {
        await mongoConnect()
        
        await User.deleteMany({})
    })

    afterAll(async () => {
        await mongoDisconnect()
    })

    it('should create a new user', async ()=>{
        const newUser = await UserService.createUser(mock) as UserProps
        expect(newUser).not.toBeInstanceOf(Error)
        expect(newUser).toHaveProperty('_id')
        expect(newUser.email).toEqual(mock.email)
        expect(newUser.document).toEqual(mock.document)
    })

    it('should not allow to create a user with existing email', async ()=>{
        const newUser = await UserService.createUser(mock) as UserProps
        expect(newUser).toBeInstanceOf(Error)
    })

    it('should find user by email', async () => {
        const user = await UserService.findByEmail(mock.email) as UserProps
        expect(user).not.toBeInstanceOf(Error)
        expect(user).toHaveProperty('_id')
        expect(user.email).toEqual(mock.email)
        expect(user.document).toEqual(mock.document)
    })

    it('should not find user by email', async () => {
        const user = await UserService.findByEmail('invalid') as UserProps
        expect(user).toBe(null)
    })

    it('should match the password from database', async () => {
        const user = await UserService.findByEmail(mock.email) as UserProps
        const match = UserService.matchPassword(mock.password, user.password)
        expect(match).toBeTruthy()
    })

    it('should not match the password from database', async () => {
        const user = await UserService.findByEmail(mock.email) as UserProps
        const match = await UserService.matchPassword('invalid', user.password)
        expect(match).toBeFalsy()
    })

    it('should change the password from database', async () => {
        const user = await UserService.changePassword(newPassword, mock.email) as UserProps
        const hashOld = await UserService.matchPassword(mock.password, user.password)
        const hashNew = await UserService.matchPassword(newPassword, user.password)
        expect(user).not.toBeInstanceOf(Error)
        expect(hashOld).toBeFalsy()
        expect(hashNew).toBeTruthy()
    })
})