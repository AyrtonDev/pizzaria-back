import { Router } from 'express'

import Pizzas from './pizzas'
import Auth from './auth'

const router = Router()

router.use('/v1', Pizzas)
router.use('/v1', Auth)

export default router