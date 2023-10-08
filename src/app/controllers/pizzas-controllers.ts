import { Request, Response } from "express"
import { PizzaProps } from "../../models/Pizzas"
import { ResponseDefault } from "../../models/DefaultResponse"
import PizzaServices from "../services/pizza-services"
import PizzasRepository from "../repositories/pizzas-repository"

const pizzaService = new PizzaServices()
const pizzaRepositories = new PizzasRepository()

export default class PizzasControllers {
    async all (req: Request, res:Response) {
        try {
            const pizzas = await pizzaService.all(pizzaRepositories)

            const response = new ResponseDefault(true, '', pizzas)
            res.status(200)
            return res.json(response)
        } catch (error) {
            console.error('ERROR GET ALL', error)
        }
    }

    async one (req: Request, res:Response) {
        try {
            const id: string = req.params.id

            const pizza = await pizzaService.one(id, pizzaRepositories)

            if (pizza instanceof Error) {
                const response = new ResponseDefault(false, pizza.message, null)
                res.status(404)
                return res.json(response)
            }

            const response = new ResponseDefault(true, '', pizza)
            res.status(200)
            return res.json(response)
        } catch (error) {
            console.error('ERROR GET ONE', error)
        }
    }

    async create (req: Request, res: Response) {
        try {
            const body: PizzaProps = req.body

            console.log(body)

            if (!body) {
                const response = new ResponseDefault(false, 'The body is empty', null)
                res.status(400)
                return res.json(response)
            }

            if (!body.name) {
                const response = new ResponseDefault(false, 'The field "name" is empty', null)
                res.status(400)
                return res.json(response)
            }

            if (body.available === null) {
                const response = new ResponseDefault(false, 'The field "available" is empty', null)
                res.status(400)
                return res.json(response)
            }

            if (!body.sizes.sm) {
                const response = new ResponseDefault(false, 'The field "size sm" is empty', null)
                res.status(400)
                return res.json(response)
            }

            if (!body.sizes.md) {
                const response = new ResponseDefault(false, 'The field "size md" is empty', null)
                res.status(400)
                return res.json(response)
            }

            if (!body.sizes.lg) {
                const response = new ResponseDefault(false, 'The field "size lg" is empty', null)
                res.status(400)
                return res.json(response)
            }

            const pizza = await pizzaService.create(body, pizzaRepositories)

            const response = new ResponseDefault(true, `Pizza ${pizza.id} was created`, null)

            res.status(201)
            return res.json(response)
        } catch (error) {
            console.error('ERROR CREATE PIZZA', error)
        }
    }

    async update (req:Request, res:Response) {
        try {
            const id: string = req.params.id
            const body: PizzaProps = req.body

            if (!body) {
                const response = new ResponseDefault(false, 'Body requirements is null', null)
                res.status(400)
                return res.json(response)
            }

            const pizza = await pizzaService.update(body, id, pizzaRepositories)
            
            if (pizza instanceof Error) {
                const response = new ResponseDefault(false, pizza.message, null)
                res.status(404)
                return res.json(response)
            }

            const response = new ResponseDefault(true, `Pizza ${pizza.id} was updated`, null)
            res.status(200)
            return res.json(response)
            
        } catch (error) {
            console.error('ERROR UPDATE PIZZA', error)
        }
    }

    async remove (req: Request, res: Response) {
        try {
            const id: string = req.params.id

            const pizza = await pizzaService.delete(id, pizzaRepositories)

            if (pizza instanceof Error) {
                const response = new ResponseDefault(false, pizza.message, null)
                res.status(404)
                return res.json(response)
            }

            const response = new ResponseDefault(true, `Pizza ${pizza.id} was delete`, null)
            res.status(200)
            return res.json(response)
        } catch (error) {
            console.error('ERROR DELETE PIZZA', error)
        }
    }
}

// TODO: change the response of pizzas list