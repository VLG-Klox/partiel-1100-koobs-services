/* eslint-disable no-case-declarations */
import { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import getCustomer from './getCustomer';
import createPaymentWithMandate from './createPaymentWithMandate';
import createCustomer from './createCustomer';

export const http: HttpFunction = (req, res) => {
	switch (req.path) {
		case '/getCustomer':
			res.status(200).send(getCustomer(req));
			break;
		case '/createPaymentWithMandate':
			res.status(201).send(createPaymentWithMandate(req));
			break;
		case '/createCustomer':
			res.status(201).send(createCustomer(req));
			break;
		default:
			res.status(405).send({ error: 'No method!' });
			break;
	}
};
