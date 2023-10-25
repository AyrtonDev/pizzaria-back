import Pizzas, { ItemPizzaProps, PizzaProps } from "../../models/Pizzas";
import { GeneralId } from "../../models/DefaultResponse";

export class PizzaRepository {

    async all() {
        return await Pizzas.find({}, '_id name available img').exec()
    }

    async one(id: GeneralId) {
        try {
            return await Pizzas.findById(id)
        } catch (error) {
            const err = error as Error
            console.error('ERROR: ', err.message)

            return new Error('Pizza not found')
        }
    }

    create() {
        return new Pizzas()
    }

    async save(data: PizzaProps) {
      return await data.save()
    }

    async delete(data: PizzaProps) {
      return await data.deleteOne();
    }
}

export default new PizzaRepository()
