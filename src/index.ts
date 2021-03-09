import { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import getCustomer from './getCustomer';
import createPaymentWithMandate from './createPaymentWithMandate';
import createCustomer from './createCustomer';

export const http: HttpFunction = (req, res) => {
	switch (req.method) {
		case 'getCustomer':
			res.status(200).send(getCustomer());
			break;
		case 'createPaymentWithMandate':
			res.status(200).send(createPaymentWithMandate());
			break;
		case 'createCustomer':
			res.status(200).send(createCustomer());
			break;
		default:
			console.log('No method!');
			break;
	}
};
