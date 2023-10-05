import { Request, Response } from 'express'
import * as UserService from '../services/UserService'
import { defaultResponse, responseDefault } from '../models/defaultResponse'
import { UserProps } from '../models/User'
import genereteToken from '../config/jose'

export const register = async (req: Request, res: Response) => {
    try {
        const data = req.body

        const newUser = await UserService.createUser(data)

        if(newUser instanceof Error) {
            const response: defaultResponse<unknown> = new responseDefault(false, newUser.message, null)

            res.status(500)
            return res.json(response)
        }

        const response: defaultResponse<null> = new responseDefault(true, '', null)
            
        res.status(201)
        return res.json(response)
    } catch(error) {
        const response: defaultResponse<unknown> = new responseDefault(false, 'Error intern', null)
            
        res.status(500)
        return res.json(response)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if(email && password) {

            const user = await UserService.findByEmail(email)

            if (user && await UserService.matchPassword(password, user.password)) {

                const token = await genereteToken({ id: user.id, email: user.email })

                const response: defaultResponse<string> = new responseDefault(true, '', token)
            
                res.status(200)
                return res.json(response)
            } else {
                const response: defaultResponse<null> = new responseDefault(false, 'Password is wrong', null)
            
                res.status(400)
                return res.json(response)
            }
        }
    } catch(error) {
        console.error(error)

        const response: defaultResponse<Error> = new responseDefault(false, 'Error intern', error)
            
        res.status(500)
        return res.json(response)
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        const response: defaultResponse<unknown> = new responseDefault(false, 'Error intern', null)
            
        res.status(500)
        return res.json(response)
    }
}

export const changePassword = async (req:Request, res: Response) => {
    try {
        const { password, newPassword } = req.body

        if (password && newPassword) {
            const isRightPassword = await UserService.matchPassword(password, password)

            if (isRightPassword) {
                const result = await UserService.changePassword(password, password)

                if (result instanceof Error) {
                    const response: defaultResponse<unknown> = new responseDefault(false, result.message, null)

                    res.status(400)
                    return res.json(response)
                }

                const response: defaultResponse<UserProps> = new responseDefault(true, 'Password was changed', result)
            
                res.status(200)
                return res.json(response)
            } else {
                const response: defaultResponse<unknown> = new responseDefault(false, 'Password is incorrect', null)
            
                res.status(400)
                return res.json(response)
            }
        }
    } catch (error) {
        const response: defaultResponse<unknown> = new responseDefault(false, 'Error intern', null)
            
        res.status(500)
        return res.json(response)
    }
}

// TODO: create list and changes in the users