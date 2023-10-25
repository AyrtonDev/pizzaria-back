import { Document, ObjectId } from "mongoose";
import {type PizzaRepository} from "../app/repositories/PizzaRepository";
import { PizzaProps } from "../models/Pizzas";

export type MockProps = Document & PizzaProps & Required<{ _id: string | ObjectId}>

export const pizzaSingleMock = {
	_id: '123456',
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
			price: 25,
		},
		lg: {
			available: true,
			price: 30,
		},
	}
};

export let pizzaListMock = [{
  _id: '123456',
  name: 'test',
  available: true,
  img: ''
}]

export const pizzaNewMock = {
	name: 'Test',
	available: false,
	describe: 'It is other pizza time!',
	img: '',
	sizes: {
		sm: {
			available: false,
			price: 0,
		},
		md: {
			available: false,
			price: 0,
		},
		lg: {
			available: false,
			price: 0,
		},
	},
};

export const pizzaMockMethod: PizzaRepository = {

	async all() {
		return await pizzaListMock as MockProps[];
	},

	async one(id: string) {
      if (id === 'invalid') {
			  return await null;
		  }

		  return await pizzaSingleMock as MockProps
	},

	create() {
		return pizzaNewMock as MockProps;
	},

  async save(data) {
    return await pizzaSingleMock as MockProps
  },

  async delete(data) {
    pizzaListMock = []
    return await pizzaSingleMock as MockProps
  }
};
