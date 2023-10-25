import {type Document, Schema, model} from 'mongoose';
import {type GeneralId} from './DefaultResponse';

export type UserRequireProps = {
	name: string;
	phone: number;
	street: string;
	district: string;
	number: string;
	zipcode: number;
	complement?: string;
};

export type UserProps = {
	_id?: GeneralId;
	name: string;
	email: string;
	password: string;
	address: AddressProps;
	document: number;
	phone: number;
	favoritePizzas: string[] | never[];
} & Document;

export type UpdateDataProps = {
	name: string;
	phone: number;
	address: AddressProps;
};

type AddressProps = {
	street: string;
	district: string;
	number: string;
	zipcode: number;
	complement?: string;
};

const schema = new Schema<UserProps>({
	name: String,
	email: String,
	password: String,
	phone: Number,
	address: {
		street: String,
		district: String,
		number: String,
		zipcode: Number,
		complement: {type: String, required: false},
	},
	document: Number,
	favoritePizzas: [String],
});

export default model<UserProps>('Users', schema);
