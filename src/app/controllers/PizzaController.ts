import {type Request, type Response} from 'express';
import {type PizzaProps} from '../../models/Pizzas';
import {ResponseDefault} from '../../models/DefaultResponse';
import PizzaService from '../services/PizzaService';
import PizzaRepository from '../repositories/PizzaRepository';

class PizzaController {
	async all(req: Request, res: Response) {
		try {
			const pizzas = await PizzaService.all(PizzaRepository);

			const response = new ResponseDefault(true, '', pizzas);
			res.status(200);
			return res.json(response);
		} catch (error) {
			console.error('ERROR GET ALL', error);
		}
	}

	async one(req: Request, res: Response) {
		try {
			const {id} = req.params;

			const pizza = await PizzaService.one(id, PizzaRepository);

			if (pizza instanceof Error) {
				const response = new ResponseDefault(false, pizza.message, null);
				res.status(404);
				return res.json(response);
			}

			const response = new ResponseDefault(true, '', pizza);
			res.status(200);
			return res.json(response);
		} catch (error) {
			console.error('ERROR GET ONE', error);
		}
	}

	async create(req: Request, res: Response) {
		const pizza = req.body as PizzaProps;

		if (!pizza) {
			const response = new ResponseDefault(false, 'The body is empty', null);
			res.status(400);
			return res.json(response);
		}

		if (!pizza.name) {
			const response = new ResponseDefault(false, 'The field "name" is empty', null);
			res.status(400);
			return res.json(response);
		}

		if (pizza.available === null) {
			const response = new ResponseDefault(false, 'The field "available" is empty', null);
			res.status(400);
			return res.json(response);
		}

		if (!pizza.sizes.sm) {
			const response = new ResponseDefault(false, 'The field "size sm" is empty', null);
			res.status(400);
			return res.json(response);
		}

		if (!pizza.sizes.md) {
			const response = new ResponseDefault(false, 'The field "size md" is empty', null);
			res.status(400);
			return res.json(response);
		}

		if (!pizza.sizes.lg) {
			const response = new ResponseDefault(false, 'The field "size lg" is empty', null);
			res.status(400);
			return res.json(response);
		}

		const pizzaCreated = await PizzaService.create(pizza, PizzaRepository);

		const response = new ResponseDefault(true, `Pizza ${pizzaCreated.id} was created`, null);

		res.status(201);
		return res.json(response);
	}

	async update(req: Request, res: Response) {
		const {id} = req.params;
		const pizza = req.body as PizzaProps;

		if (!pizza) {
			const response = new ResponseDefault(false, 'Body requirements is null', null);
			res.status(400);
			return res.json(response);
		}

		const pizzaUpdated = await PizzaService.update(pizza, id, PizzaRepository);

		if (pizzaUpdated instanceof Error) {
			const response = new ResponseDefault(false, pizzaUpdated.message, null);
			res.status(404);
			return res.json(response);
		}

		const response = new ResponseDefault(true, `Pizza ${pizzaUpdated.id} was updated`, null);
		res.status(200);
		return res.json(response);
	}

	async remove(req: Request, res: Response) {
		const {id} = req.params;

		const pizza = await PizzaService.delete(id, PizzaRepository);

		if (pizza instanceof Error) {
			const response = new ResponseDefault(false, pizza.message, null);
			res.status(404);
			return res.json(response);
		}

		const response = new ResponseDefault(true, `Pizza ${pizza.id} was delete`, null);
		res.status(200);
		return res.json(response);
	}
}

export default new PizzaController()

// eslint-disable-next-line no-warning-comments
// TODO: change the response of pizzas list
