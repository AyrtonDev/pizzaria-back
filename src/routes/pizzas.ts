import { Router } from 'express'
import * as PizzaController from '../controllers/pizzas.controllers'

const router = Router()

router.get('/pizzas', PizzaController.all)

router.get('/pizza/:id', PizzaController.one)

router.post('/pizza', PizzaController.create)

router.put('/pizza/:id', PizzaController.update)

router.delete('/pizza/:id', PizzaController.remove)

export default router