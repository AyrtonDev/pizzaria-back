import { Request, Response } from "express"
import Pizza, { PizzaProps } from "../models/Pizza"
import { defaultResponse, responseDefault } from "../models/defaultResponse"
import * as PizzaService from '../services/PizzaService'

export const all = async (req: Request, res:Response) => {
    try {
        const pizzas = await PizzaService.findAllPizzas()

        const response: defaultResponse<PizzaProps[] | never[]> = new responseDefault(true, '', pizzas)
        res.status(200)
        return res.json(response)
    } catch (error) {
        console.error(error)

        const response: defaultResponse<unknown> = new responseDefault(false, 'Error internal', null)

        res.status(500)
        return res.json(response)
    }
}

export const one = async (req: Request, res:Response) => {
    try {
        const id: string = req.params.id

        const pizza = await PizzaService.findOnePizza(id)

        if (pizza instanceof Error) {
            const response: defaultResponse<unknown> = new responseDefault(false, pizza.message, null)
            res.status(404)
            return res.json(response)
        }

        const response: defaultResponse<PizzaProps> = new responseDefault(true, '', pizza)
        res.status(200)
        return res.json(response)
    } catch (error) {
        console.error(error)

        const response: defaultResponse<unknown> = new responseDefault(false, 'Error internal', null)

        res.status(500)
        return res.json(response)
    }
}

export const create = async (req: Request, res: Response) => {
    try {
        const body: PizzaProps = req.body

        console.log(body)

        if (!body) {
            const response: defaultResponse<unknown> = new responseDefault(false, 'The body is empty', null)
            res.status(400)
            return res.json(response)
        }

        if (!body.name) {
            const response: defaultResponse<unknown> = new responseDefault(false, 'The field "name" is empty', null)
            res.status(400)
            return res.json(response)
        }

        if (body.available === null) {
            const response: defaultResponse<unknown> = new responseDefault(false, 'The field "available" is empty', null)
            res.status(400)
            return res.json(response)
        }

        if (!body.sizes.sm) {
            const response: defaultResponse<unknown> = new responseDefault(false, 'The field "size sm" is empty', null)
            res.status(400)
            return res.json(response)
        }

        if (!body.sizes.md) {
            const response: defaultResponse<unknown> = new responseDefault(false, 'The field "size md" is empty', null)
            res.status(400)
            return res.json(response)
        }

        if (!body.sizes.lg) {
            const response: defaultResponse<unknown> = new responseDefault(false, 'The field "size lg" is empty', null)
            res.status(400)
            return res.json(response)
        }

        const newPizza = await PizzaService.createPizza(body)

        const response: defaultResponse<PizzaProps> = new responseDefault(true, 'New pizza was created', newPizza)

        res.status(201)
        return res.json(response)
    } catch (error) {
        console.error(error)

        const response: defaultResponse<unknown> = new responseDefault(false, 'Error internal', null)

        res.status(500)
        return res.json(response)
    }
}

export const update = async (req:Request, res:Response) => {
    try {
        const id: string = req.params.id
        const body: PizzaProps = req.body

        if (!body) {
            const response: defaultResponse<unknown> = new responseDefault(false, 'Body requirements is null', null)
            res.status(400)
            return res.json(response)
        }

        const updatePizza = await PizzaService.updatePizza(body, id)        

        const response: defaultResponse<PizzaProps> = new responseDefault(true, 'The pizza was updated', updatePizza)
        res.status(200)
        return res.json(response)
        
    } catch (error) {
        console.error(error)

        const response: defaultResponse<unknown> = new responseDefault(false, 'Error internal', null)

        res.status(500)
        return res.json(response)
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id

        const pizza = await PizzaService.deletePizza(id)

        if (pizza instanceof Error) {
            const response: defaultResponse<unknown> = new responseDefault(false, pizza.message, null)
            res.status(404)
            return res.json(response)
        }

        const response: defaultResponse<unknown> = new responseDefault(true, 'Pizza was delete', pizza)
        res.status(200)
        return res.json(response)
    } catch (error) {
        console.error(error)

        const response: defaultResponse<unknown> = new responseDefault(false, 'Error internal', null)

        res.status(500)
        return res.json(response)
    }
}

// TODO: change the response of pizzas list