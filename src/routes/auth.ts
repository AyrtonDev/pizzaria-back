import { Router } from 'express'
import * as AuthController from '../controllers/auth.controler'
import { Auth } from '../middleware/auth'

const router = Router()

router.post('/register', AuthController.register)

router.post('/login', AuthController.login)

router.post('/user/update', Auth.private, AuthController.update)

router.put('/user/change-password', Auth.private, AuthController.changePassword)

export default router