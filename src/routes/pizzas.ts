import { Router } from 'express'
import * as PizzaController from '../controllers/pizzas.controllers'
import { Auth } from '../middleware/auth'

const router = Router()

router.get('/pizzas', PizzaController.all)

router.get('/pizza/:id', Auth.private, PizzaController.one)

router.post('/pizza', Auth.private, PizzaController.create)

router.put('/pizza/:id', Auth.private, PizzaController.update)

router.delete('/pizza/:id', Auth.private, PizzaController.remove)

export default router