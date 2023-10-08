import { PizzaProps } from "../../models/Pizzas"
import { GeneralId } from "../../models/DefaultResponse"
import PizzasRepository from "../repositories/pizzas-repository"

export default class PizzaServices {
    async all (PizzasRepository: PizzasRepository): Promise<PizzaProps[] | never[]> {
        return await PizzasRepository.all()
    }

    async one (id: GeneralId, PizzasRepository: PizzasRepository): Promise<PizzaProps | Error> {
        const pizza = await PizzasRepository.one(id)

        if (pizza === null) {
            return new Error('Pizza not found')
        } else {
            return pizza
        }
    }

    async create (pizza: PizzaProps, PizzasRepository: PizzasRepository): Promise<PizzaProps> {
        const newPizza = PizzasRepository.create()

        newPizza.name = pizza.name
        newPizza.available = pizza.available
        newPizza.describe = pizza.describe
        newPizza.img = pizza.img
        newPizza.sizes = pizza.sizes

        return await PizzasRepository.save(newPizza)
    }

    async update (updatePizza: PizzaProps, id: GeneralId, PizzasRepository: PizzasRepository): Promise<PizzaProps | Error> {
        const pizza = await PizzasRepository.one(id)

        if (pizza instanceof Error) return pizza

        if (pizza === null) throw new Error('Pizza not found')

        if (pizza) {
            if (pizza.name !== updatePizza.name && updatePizza.name.length > 1) pizza.name = updatePizza.name
            if (pizza.available !== updatePizza.available) pizza.available = updatePizza.available
            pizza.describe = updatePizza.describe
            pizza.img = updatePizza.img
            pizza.sizes = updatePizza.sizes

            return await PizzasRepository.save(pizza)
        } else {
            throw new Error('Pizza not found')
        }
    }

    async delete (id: GeneralId, PizzasRepository: PizzasRepository): Promise<PizzaProps | Error> {
        const pizza = await PizzasRepository.one(id)

        if (pizza instanceof Error) return pizza

        if (pizza === null) throw new Error('Pizza not found')

        return await PizzasRepository.delete(pizza)
        
    }
}