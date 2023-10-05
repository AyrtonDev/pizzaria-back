import { NextFunction, Request, Response } from "express";
import { defaultResponse, responseDefault } from "../models/defaultResponse";
import * as UserService from '../services/UserService'
import * as jose from 'jose'

const secretKey = Bun.env.JWT_SECRET_KEY as string

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        let success = false

        if (req.headers.authorization) {
            const jwtToken = req.headers.authorization.split(' ')[1]

            if (!jwtToken) {
                return res.status(401).send('Token header is empty')
            }

            try {
                const { payload } = await jose.jwtVerify(jwtToken, new TextEncoder().encode(secretKey))

                const user = await UserService.findByEmail(payload.email as string)

                if (user) success = true
            } catch (error) {
                res.status(401).send("Error validating JWT token")
            }
        }

        if (success) {
            next()
        } else {
            const response: defaultResponse<unknown> = new responseDefault(false, 'Not permitted to access without a token valid', null)
            
            res.status(403)
            return res.json(response) 
        }
    }
}

// TODO: to vary in the middlewares depending of type account