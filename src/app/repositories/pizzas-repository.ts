import Pizzas, { PizzaProps } from "../../models/Pizzas";
import { GeneralId } from "../../models/DefaultResponse";
import { Error } from "mongoose";

export default class PizzasRepository {

    async all(): Promise<PizzaProps[] | never[]> {
        return await Pizzas.find({})
    }

    async one(id: GeneralId): Promise<PizzaProps | null | Error> {
        try {
            return await Pizzas.findById(id)
        } catch (error) {
            const err = error as Error
            console.error('ERROR: ', err.message)

            return new Error('Pizza not found')
        }
    }

    create(): PizzaProps {
        return new Pizzas()
    }

    async save(data: PizzaProps): Promise<PizzaProps> {
        return await data.save()
    }

    async delete(data: PizzaProps): Promise<PizzaProps> {
        return await data.deleteOne()
    }
}