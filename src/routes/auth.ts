import { Router } from 'express'
import * as AuthController from '../controllers/auth.controler'

const router = Router()

router.get('/register', AuthController.register)

router.get('/login', AuthController.login)

router.post('/user/update', AuthController.update)

router.put('/user/change-password', AuthController.changePassword)

export default router