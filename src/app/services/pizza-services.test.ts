import { describe, expect, it } from "bun:test"
import PizzaServices from "./pizza-services"
import { pizzaMockData, pizzaMockMethod, pizzaMockNew } from "../../mock/pizza"
import { PizzaProps } from "../../models/Pizzas"

describe('Testing pizza service', () => {

    const pizzaService = new PizzaServices()

    it('should create a new pizza', async () => {
        const newPizza = await pizzaService.create(pizzaMockData[0], pizzaMockMethod)

        expect(newPizza).toHaveProperty('_id')
        expect(newPizza.name).toEqual(pizzaMockData[0].name)
        expect(newPizza.describe).toEqual(pizzaMockData[0].describe)
        expect(newPizza.available).toEqual(pizzaMockData[0].available)
    })

    it('should get all pizzas',async () => {
        const pizzas = await pizzaService.all(pizzaMockMethod)
    
        expect(pizzas).not.toBeArrayOfSize(0)
    })

    it('should get one pizza', async () => {
        const pizza = await pizzaService.one('123456', pizzaMockMethod)

        expect(pizza).toHaveProperty('_id')
        expect(pizza).toHaveProperty('name')
        expect(pizza).toHaveProperty('describe')
        expect(pizza).toHaveProperty('available')
        expect(pizza).toHaveProperty('sizes')
    })

    it('should not get one pizza', async () => {
        const pizza = await pizzaService.one('invalid', pizzaMockMethod)

        expect(pizza).toBeInstanceOf(Error)
    })

    it('should change pizza data',async () => {
        const pizza = await pizzaService.update(pizzaMockNew, '123456', pizzaMockMethod) as PizzaProps

        expect(pizza.name).toEqual(pizzaMockNew.name)
        expect(pizza.describe).toEqual(pizzaMockNew.describe)
        expect(pizza.available).toEqual(pizzaMockNew.available)
    })

    it('should delete a pizza from database',async () => {
        const pizza = await pizzaService.delete('12345', pizzaMockMethod)
        const pizzas = await pizzaService.all(pizzaMockMethod)

        pizzas.length = 0

        expect(pizza).toHaveProperty('_id')
        expect(pizzas).toBeArrayOfSize(0)
    })
})