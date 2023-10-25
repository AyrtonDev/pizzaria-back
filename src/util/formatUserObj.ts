import {type UserRequireProps} from '../models/User';

export default function (data: UserRequireProps) {
	return {
		name: data.name,
		phone: data.phone,
		address: {
			street: data.street,
			district: data.district,
			number: data.number,
			complement: data.complement ? data.complement : '',
			zipcode: data.zipcode,
		},
	};
}
