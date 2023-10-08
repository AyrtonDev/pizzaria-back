import { Request, Response } from 'express'
import { ResponseDefault } from '../../models/DefaultResponse'
import genereteToken from '../../config/jose'
import AuthRepository from '../repositories/user-repository'
import UserServices from '../services/user-services'

const authRepositories = new AuthRepository()
const userService = new UserServices()

export default class AuthControllers {
    async register (req: Request, res: Response) {
        try {
            const user = req.body

            const newUser = await userService.create(user, authRepositories)

            if(newUser instanceof Error) {
                const response = new ResponseDefault(false, newUser.message, null)

                res.status(400)
                return res.json(response)
            }

            const response = new ResponseDefault(true, `User ${newUser.id} was created`, null)
                
            res.status(201)
            return res.json(response)
        } catch(error) {
            console.log('ERROR REGISTER: ', error)
        }
    }

    async login (req: Request, res: Response) {
        try {
            const { email, password } = req.body

            if (!email) {
                const response = new ResponseDefault(false, 'Field "email" is empty', null)
            
                res.status(400)
                return res.json(response)
            }

            if (!password) {
                const response = new ResponseDefault(false, 'Field "password" is empty', null)
            
                res.status(400)
                return res.json(response)
            }

            const user = await userService.one({email}, authRepositories)

            if (user instanceof Error) {
                const response = new ResponseDefault(false, user.message, null)
            
                res.status(400)
                return res.json(response)
            }

            if (user && await userService.match(password, user.password)) {

                const token = await genereteToken({ id: user.id, email: user.email })

                const response = new ResponseDefault(true, '', token)
            
                res.status(200)
                return res.json(response)
            } else {
                const response = new ResponseDefault(false, 'Password is wrong', null)
            
                res.status(400)
                return res.json(response)
            }

        } catch(error) {
            console.error('ERROR LOGIN: ', error)
        }
    }
}