import { describe, expect, it } from 'bun:test'
import UserServices from './user-services'
import { UserProps } from '../../models/User'
import { userMockData, userMockMethod } from '../../mock/user'

describe('Testing user service', () => {

    const userService = new UserServices()

    it('should create a new user', async ()=>{
        const data = { ...userMockData[0], document: 0, email: 'invalid' }
        const newUser = await userService.create(data, userMockMethod) as UserProps
        expect(newUser).not.toBeInstanceOf(Error)
        expect(newUser).toHaveProperty('_id')
        expect(newUser.email).toEqual(data.email)
        expect(newUser.document).toEqual(data.document)
    })

    it('should not allow to create a user with existing email', async ()=>{

        const newUser = await userService.create(userMockData, userMockMethod)
        expect(newUser).toBeInstanceOf(Error)
    })

    it('should find user by email', async () => {
        const user = await userService.one({}, userMockMethod) as UserProps
        expect(user).not.toBeInstanceOf(Error)
        expect(user).toHaveProperty('_id')
        expect(user.email).toEqual(userMockData[0].email)
        expect(user.document).toEqual(userMockData[0].document)
    })

    it('should not find user by email', async () => {
        const data = { ...userMockData[0], email: 'invalid' }
        const user = await userService.one(data, userMockMethod)
        expect(user).toBeInstanceOf(Error)
    })

    it('should match the password from database', async () => {
        const hash = await Bun.password.hash(userMockData[0].password)
        const match = userService.match(userMockData[0].password, hash)
        expect(match).toBeTruthy()
    })

    it('should not match the password from database', async () => {
        const hash = await Bun.password.hash(userMockData[0].password)
        const match = await userService.match('invalid', hash)
        expect(match).toBeFalsy()
    })

    it('should change the password from database', async () => {
        const user = await userService.updatePassword('123456', '', userMockMethod) as UserProps
        const hashOld = await userService.match(userMockData[0].password, user.password)
        const hashNew = await userService.match('123456', user.password)
        expect(user).not.toBeInstanceOf(Error)
        expect(hashOld).toBeFalsy()
        expect(hashNew).toBeTruthy()
    })
})

// TODO: shall create more test and make better the already exists