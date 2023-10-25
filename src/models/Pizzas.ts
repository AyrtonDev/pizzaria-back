import {type Document, Schema, model} from 'mongoose';
import {type GeneralId} from './DefaultResponse';

export type PizzaProps = {
	_id?: GeneralId;
	name: string;
	available: boolean;
	describe: string;
	img: string;
	sizes: SizesProps;
} & Document;

export type ItemPizzaProps = {
	['_id']: GeneralId;
	name: string;
	available: boolean;
	img: string;
};

type SizesProps = {
	sm: SizeProps;
	md: SizeProps;
	lg: SizeProps;
	fm?: SizeProps;
	e?: SizeProps;
};

type SizeProps = {
	available: boolean;
	price: number;
};

const schema = new Schema<PizzaProps>({
	name: String,
	available: Boolean,
	describe: String,
	img: String,
	sizes: {
		sm: {
			available: Boolean,
			price: Number,
		},
		md: {
			available: Boolean,
			price: Number,
		},
		lg: {
			available: Boolean,
			price: Number,
		},
	},
});

export default model<PizzaProps>('Pizzas', schema);
