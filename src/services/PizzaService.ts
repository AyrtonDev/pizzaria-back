import { Types } from "mongoose"
import Pizza, { PizzaProps } from "../models/Pizza"

export const findAllPizzas = async () => {
    return await Pizza.find({})
}

export const findOnePizza = async (id: Types.ObjectId | string) => {
    const pizza = await Pizza.findById(id)

    if (pizza) {
        return pizza
    } else {
        throw new Error('Pizza not found')
    }
}

export const createPizza = async (pizza: PizzaProps) => {
    const newPizza = new Pizza()

    newPizza.name = pizza.name
    newPizza.available = pizza.available
    newPizza.describe = pizza.describe
    newPizza.img = pizza.img
    newPizza.sizes = pizza.sizes

    return await newPizza.save()
}

export const updatePizza = async (updatePizza: PizzaProps, id: Types.ObjectId | string) => {
    const pizza = await Pizza.findById(id)

    if (pizza) {
        if (pizza.name !== updatePizza.name && updatePizza.name.length > 1) pizza.name = updatePizza.name
        if (pizza.available !== updatePizza.available) pizza.available = updatePizza.available
        pizza.describe = updatePizza.describe
        pizza.img = updatePizza.img
        pizza.sizes = updatePizza.sizes

        return await pizza.save()
    } else {
        throw new Error('The pizza not found')
    }
}

export const deletePizza = async (id: Types.ObjectId | string) => {
    const pizza = await Pizza.findById(id)

    if (pizza) {
        return await pizza.deleteOne()
    } else {
        throw new Error('The pizza not found')
    }
}