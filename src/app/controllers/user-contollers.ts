import { Request, Response } from 'express'
import { ResponseDefault } from "../../models/DefaultResponse"
import UserServices from '../services/user-services'
import UserRepository from '../repositories/user-repository'
import { buildAddress } from '../../util/build'

const userService = new UserServices()
const userRepositories = new UserRepository()

export default class UserControllers {
    async update (req: Request, res: Response) {
        try {
            const data = req.body
            const email = req.body.email as string

            if (!data.name) {
                const response = new ResponseDefault(false, 'Field "name" is empty', null)
                
                res.status(400)
                return res.json(response)
            }

            if (!data.street) {
                const response = new ResponseDefault(false, 'Field "street" is empty', null)
                
                res.status(400)
                return res.json(response)
            }

            if (!data.district) {
                const response = new ResponseDefault(false, 'Field "district" is empty', null)
                
                res.status(400)
                return res.json(response)
            }

            if (!data.number) {
                const response = new ResponseDefault(false, 'Field "number" is empty', null)
                
                res.status(400)
                return res.json(response)
            }

            if (!data.zipcode || data.zipcode.toString().length < 8) {
                const response = new ResponseDefault(false, 'Field "zipcode" is empty or incorrect', null)
                
                res.status(400)
                return res.json(response)
            }

            if (!data.phone || data.phone.length.toString().length < 12) {
                const response = new ResponseDefault(false, 'Field "phone" is empty or incorrect', null)
                
                res.status(400)
                return res.json(response)
            }

            const newData = buildAddress(data)

            const result = await userService.update(email, newData, userRepositories)

            if (result instanceof Error) {
                const response = new ResponseDefault(false, result.message, null)
                
                res.status(404)
                return res.json(response)
            }

            const response = new ResponseDefault(true, `User ${result.id} was updated`, null)
                
            res.status(200)
            return res.json(response)
            
        } catch (error) {
            console.error(error)
        }
    }

    async changePassword (req:Request, res: Response) {
        try {
            const { password, newPassword, email } = req.body
            let isRightPassword = false

            const user = await userService.one({ email }, userRepositories)

            if (user instanceof Error) {
                const response = new ResponseDefault(false, 'User not found', null)
                
                res.status(404)
                return res.json(response)
            }

            if (!password) {
                const response = new ResponseDefault(false, 'Field "password" is empty', null)
                
                res.status(400)
                return res.json(response)
            }
            
            isRightPassword = await userService.match(password, user.password)
            

            if (!newPassword) {
                const response = new ResponseDefault(false, 'Field "newPassword" is empty', null)
                
                res.status(400)
                return res.json(response)
            }

            if (isRightPassword) {
                const result = await userService.updatePassword(newPassword, email, userRepositories)

                if (result instanceof Error) {
                    const response = new ResponseDefault(false, result.message, null)

                    res.status(400)
                    return res.json(response)
                }

                const response = new ResponseDefault(true, 'Password was changed', null)
            
                res.status(200)
                return res.json(response)
            } else {
                const response = new ResponseDefault(false, 'Password is incorrect', null)
            
                res.status(400)
                return res.json(response)
            }
            
        } catch (error) {
            console.error('ERROR CHANGE-PASSWORD: ', error)
        }
    }
}

// TODO: create list and changes in the users