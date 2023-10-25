import {type Types} from 'mongoose';

export type GeneralId = string | Types.ObjectId | undefined;

export class ResponseDefault<T> {
	statusResponse: boolean;
	messageResponse?: string;
	data?: T;

	constructor(status: boolean, message: string, data: T | undefined) {
		this.statusResponse = status;
		this.messageResponse = message;
		this.data = data;
	}
}
