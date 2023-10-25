import {type ItemPizzaProps, type PizzaProps} from '../../models/Pizzas';
import {type GeneralId} from '../../models/DefaultResponse';
import {type PizzaRepository} from '../repositories/PizzaRepository';
import { Document } from 'mongoose';

class PizzaServices {
	async all(PizzasRepository: PizzaRepository) {
		return await PizzasRepository.all();
	}

	async one(id: GeneralId, PizzasRepository: PizzaRepository) {
		const pizza = await PizzasRepository.one(id);

		if (pizza === null) {
			return new Error('Pizza not found');
		}

		return pizza;
	}

	async create(pizza: PizzaProps, PizzasRepository: PizzaRepository) {
		const newPizza = PizzasRepository.create();

		newPizza.name = pizza.name;
		newPizza.available = pizza.available;
		newPizza.describe = pizza.describe;
		newPizza.img = pizza.img;
		newPizza.sizes = pizza.sizes;

		return await PizzasRepository.save(newPizza);
	}

	async update(updatePizza: PizzaProps, id: GeneralId, PizzasRepository: PizzaRepository) {
		const pizza = await PizzasRepository.one(id);

		if (pizza instanceof Error) {
			return pizza;
		}

		if (pizza === null) {
			throw new Error('Pizza not found');
		}

		if (pizza) {
			if (pizza.name !== updatePizza.name && updatePizza.name.length > 1) {
				pizza.name = updatePizza.name;
			}

			if (pizza.available !== updatePizza.available) {
				pizza.available = updatePizza.available;
			}

			pizza.describe = updatePizza.describe;
			pizza.img = updatePizza.img;
			pizza.sizes = updatePizza.sizes;

			return await PizzasRepository.save(pizza);
		}

		throw new Error('Pizza not found');
	}

	async delete(id: GeneralId, PizzasRepository: PizzaRepository) {
		const pizza = await PizzasRepository.one(id);

		if (pizza instanceof Error) {
			return pizza;
		}

		if (pizza === null) {
			throw new Error('Pizza not found');
		}

		return await PizzasRepository.delete(pizza);
	}
}

export default new PizzaServices()
