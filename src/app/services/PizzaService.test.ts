import {describe, expect, it} from 'bun:test';
import PizzaService from './PizzaService';
import {pizzaSingleMock, pizzaListMock, pizzaMockMethod, pizzaNewMock, MockProps} from '../../mock/pizza';
import {type PizzaProps} from '../../models/Pizzas';

describe('Testing pizza service', () => {

	it('should create a new pizza', async () => {
		const newPizza = await PizzaService.create(pizzaSingleMock as MockProps, pizzaMockMethod);

		expect(newPizza).toHaveProperty('_id');
		expect(newPizza.name).toEqual(pizzaSingleMock.name);
		expect(newPizza.describe).toEqual(pizzaSingleMock.describe);
		expect(newPizza.available).toEqual(pizzaSingleMock.available);
	});

	it('should get all pizzas', async () => {
		const pizzas = await PizzaService.all(pizzaMockMethod);

		expect(pizzas).not.toBeArrayOfSize(0);
	});

	it('should get one pizza', async () => {
		const pizza = await PizzaService.one('123456', pizzaMockMethod);

		expect(pizza).toHaveProperty('_id');
		expect(pizza).toHaveProperty('name');
		expect(pizza).toHaveProperty('describe');
		expect(pizza).toHaveProperty('available');
		expect(pizza).toHaveProperty('sizes');
	});

	it('should not get one pizza', async () => {
		const pizza = await PizzaService.one('invalid', pizzaMockMethod);

		expect(pizza).toBeInstanceOf(Error);
	});

	it('should change pizza data', async () => {
		const pizza = await PizzaService.update(pizzaNewMock as MockProps, '123456', pizzaMockMethod) as PizzaProps;

		expect(pizza.name).toEqual(pizzaNewMock.name);
		expect(pizza.describe).toEqual(pizzaNewMock.describe);
		expect(pizza.available).toEqual(pizzaNewMock.available);
	});

	it('should delete a pizza from database', async () => {
		const pizza = await PizzaService.delete('12345', pizzaMockMethod);
		const pizzas = await PizzaService.all(pizzaMockMethod);

		pizzas.length = 0;

		expect(pizza).toHaveProperty('_id');
		expect(pizzas).toBeArrayOfSize(0);
	});
});
