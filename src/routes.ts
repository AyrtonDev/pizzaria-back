import {Router as createRouter} from 'express';
import AuthMiddlewares from './app/middleware/auth';
import PizzaController from './app/controllers/PizzaController';
import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';

const authMiddleware = new AuthMiddlewares();

const router = createRouter();

const version = '/v1';

// Auth
router.post(version + '/register', AuthController.register);
router.post(version + '/login', AuthController.login);

// Users
router.post(version + '/change-password', authMiddleware.private, UserController.changePassword);
router.post(version + '/update', authMiddleware.private, UserController.update);

// Pizzas
router.get(version + '/pizzas', PizzaController.all);
router.get(version + '/pizza/:id', PizzaController.one);
router.post(version + '/pizza', authMiddleware.private, PizzaController.create);
router.put(version + '/pizza/:id', authMiddleware.private, PizzaController.update);
router.delete(version + '/pizza/:id', authMiddleware.private, PizzaController.remove);

export default router;
