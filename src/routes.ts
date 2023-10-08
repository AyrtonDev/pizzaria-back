import { Router } from 'express'
import AuthMiddlewares from './app/middleware/auth'
import PizzasControllers from './app/controllers/pizzas-controllers'
import AuthControllers from './app/controllers/auth-controllers'
import UserControllers from './app/controllers/user-contollers'

const pizzasController = new PizzasControllers()
const authController = new AuthControllers()
const userController = new UserControllers()

const authMiddleware = new AuthMiddlewares()

const router = Router()

const version = '/v1'

// Auth
router.post(version + '/register', authController.register)
router.post(version + '/login', authController.login)

// Users
router.post(version + '/change-password', authMiddleware.private, userController.changePassword)
router.post(version + '/update', authMiddleware.private, userController.update)

// Pizzas
router.get(version + '/pizzas', pizzasController.all)
router.get(version + '/pizza/:id', pizzasController.one)
router.post(version + '/pizza', authMiddleware.private, pizzasController.create)
router.put(version + '/pizza/:id', authMiddleware.private, pizzasController.update)
router.delete(version + '/pizza/:id', authMiddleware.private, pizzasController.remove)

export default router