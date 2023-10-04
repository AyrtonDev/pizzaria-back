import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import Pizza from "../models/Pizza"
import * as PizzaService from './PizzaService'
import { disconnect } from "mongoose"

describe('Testing pizza service', () => {

    const mock = {
        name: 'test',
        available: true,
        describe: 'It is pizza time!',
        img: '',
        sizes: {
            sm: {
                available: true,
                price: 20,
            },
            md: {
                available: true,
                price: 25
            },
            lg: {
                available: true,
                price: 30
            }
        }
    }

    const mockUpdated = {
        name: 'Test',
        available: false,
        describe: 'It is other pizza time!',
        img: '',
        sizes: {
            sm: {
                available: false,
                price: 0
            },
            md: {
                available: false,
                price: 0
            },
            lg: {
                available: false,
                price: 0
            }
        }
    }

    beforeAll(async () => {
        await Pizza.deleteMany({})
    })

    afterAll(async () => {
        await disconnect()
    })

    it('should create a new pizza', async () => {
        const newPizza = await PizzaService.createPizza(mock)

        expect(newPizza).toHaveProperty('_id')
        expect(newPizza.name).toEqual(mock.name)
        expect(newPizza.describe).toEqual(mock.describe)
        expect(newPizza.available).toEqual(mock.available)
    })

    it('should get all pizzas',async () => {
        const pizzas = await PizzaService.findAllPizzas()
    
        expect(pizzas).not.toBeArrayOfSize(0)
    })

    it('should get one pizza', async () => {
        const pizzas = await PizzaService.findAllPizzas()
        const pizza = await PizzaService.findOnePizza(pizzas[0]['_id'])

        expect(pizza).toHaveProperty('_id')
        expect(pizza).toHaveProperty('name')
        expect(pizza).toHaveProperty('describe')
        expect(pizza).toHaveProperty('available')
        expect(pizza).toHaveProperty('sizes')
    })

    it('should change pizza data',async () => {
        const pizzas = await PizzaService.findAllPizzas()
        const pizza = await PizzaService.updatePizza(mockUpdated, pizzas[0]['_id'])

        expect(pizza.name).toEqual(mockUpdated.name)
        expect(pizza.describe).toEqual(mockUpdated.describe)
        expect(pizza.available).toEqual(mockUpdated.available)
    })

    it('should delete a pizza from database',async () => {
        const pizzas = await PizzaService.findAllPizzas()
        await PizzaService.deletePizza(pizzas[0]['_id'])
        const zeroPizzas = await PizzaService.findAllPizzas()

        expect(zeroPizzas).toBeArrayOfSize(0)
    })
})